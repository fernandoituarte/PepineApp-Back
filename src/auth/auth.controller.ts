import { Controller, Post, Body, Param, Res, HttpCode } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import {
  CreateUserDto,
  LoginUserDto,
  ForgotPasswordDto,
  UpdatePasswordDto,
} from './dto';
import {
  GetUser,
  Auth,
  ApiRegisterResponse,
  ApiLoginResponse,
  ApiForgotPasswordResponse,
  ApiResetPasswordResponse,
  ApiUpdatePasswordResponse,
} from './decorators';
import { ValidRoles } from './interfaces/valid-roles.interface';
import { ConfigService } from '@nestjs/config';
import { ApiLogoutResponse } from './decorators/ApiResponses/logout-response.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Registers a new user, hashes the password, saves the user to the database,
   * and sets authentication cookies in the response.
   *
   * This method creates a new user, generates a JWT token, and sets it in an HttpOnly cookie.
   * It also stores the user's role and ID in another cookie for further access control.
   *
   * @param createUserDto - The user's data required for registration (e.g., name, email, password).
   * @param res - The response object used to set authentication cookies.
   * @returns An object containing a success message and HTTP status 201.
   */
  @Post('register')
  @ApiRegisterResponse()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{
    status: number;
    message: string;
    user: { role: string; id: string };
  }> {
    const { token, role, id } = await this.authService.create(createUserDto);

    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';
    const cookieDomain = this.configService.get<string>('COOKIE_DOMAIN');

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: cookieDomain,
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });
    res.cookie('user', JSON.stringify({ role, id }), {
      httpOnly: false,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: cookieDomain,
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });

    return {
      status: 201,
      message: 'The user has been successfully registered.',
      user: { role, id },
    };
  }

  /**
   * Logs in a user and sets authentication cookies in the response.
   *
   * This method verifies the user's credentials, generates a JWT token,
   * and sets it in an HttpOnly cookie along with the user's role and ID in another cookie.
   *
   * @param loginUserDto - The user's credentials (email and password) for login.
   * @param res - The response object used to set authentication cookies.
   * @returns An object containing a success message and HTTP status 201.
   */
  @Post('login')
  @ApiLoginResponse()
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{
    status: number;
    message: string;
    user: { role: string; id: string };
  }> {
    const { token, role, id } = await this.authService.login(loginUserDto);

    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';
    const cookieDomain = this.configService.get<string>('COOKIE_DOMAIN');

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: cookieDomain,
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });
    res.cookie('user', JSON.stringify({ role, id }), {
      httpOnly: false,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: cookieDomain,
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });

    return {
      status: 201,
      message: 'Login successful',
      user: { role, id },
    };
  }

  @Post('logout')
  @ApiLogoutResponse()
  @Auth(ValidRoles.admin, ValidRoles.user)
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) res: Response): Promise<{
    status: number;
    message: string;
  }> {
    res.clearCookie('authToken');
    res.clearCookie('user');

    return {
      status: 200,
      message: 'Logout successful',
    };
  }

  /**
   * Sends a password recovery email to the user.
   *
   * This method takes the user's email from the `forgotPasswordDto`, generates a password reset token,
   * and sends an email with the recovery instructions.
   *
   * @param forgotPasswordDto - The data transfer object containing the user's email.
   * @returns A success message indicating that the email has been sent successfully ('Email envoyé correctement').
   */
  @Post('forgot-password')
  @ApiForgotPasswordResponse()
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<{ status: number; message: string }> {
    const response = await this.authService.forgotPassword(forgotPasswordDto);

    return { status: 201, message: response };
  }

  /**
   * Resets the user's password using the provided token.
   *
   * This method verifies the password reset token and updates the user's password
   * with the new one provided in the `forgotPasswordDto`.
   *
   * @param token - The password reset token sent to the user via email.
   * @param forgotPasswordDto - The data transfer object containing the new password.
   * @returns The updated user information after successfully resetting the password.
   */

  @Post('reset-password/:token')
  @ApiResetPasswordResponse()
  async resetPassword(
    @Param('token') token: string,
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<{ status: number; user: User; message: string }> {
    const response = await this.authService.resetPassword(
      token,
      forgotPasswordDto,
    );

    return {
      status: 200,
      message: 'User updated successfully',
      user: response,
    };
  }

  /**
   * Updates the user's password from their profile.
   *
   * This method allows authenticated users (admin or regular users) to update their password.
   * It takes the current user and the new password provided in the `updatePassword` DTO.
   * Only accessible to authenticated users.
   *
   * @param updatePassword - The data transfer object containing the new password.
   * @param user - The current authenticated user.
   * @returns A success message indicating that the password has been updated.
   */

  @Post('update-password')
  @Auth(ValidRoles.admin, ValidRoles.user)
  @ApiUpdatePasswordResponse()
  async updatePassword(
    @Body() updatePassword: UpdatePasswordDto,
    @GetUser() user: User,
  ): Promise<{ status: number; message: string }> {
    const response = await this.authService.updatePassword(
      updatePassword,
      user,
    );

    return { status: 201, message: response };
  }
}
