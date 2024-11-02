import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { CustomMailerService } from 'src/custom-mailer/custom-mailer.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('Auth');
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly customMailerService: CustomMailerService,
  ) {}

  /**
   * Creates a new user with the provided data, hashes the password, saves the user to the database,
   * and returns a JWT token, role, and id.
   *
   * @param createUserDto - The DTO containing user registration data (name, email, password, etc.)
   * @returns An object containing the JWT token, user role, and id.
   * @throws InternalServerErrorException if a server error occurs.
   * @throws ConflictException if the user already exists in the database (duplicate).
   */
  async create(createUserDto: CreateUserDto): Promise<{
    token: string;
    role: string;
    id: string;
  }> {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;

      return {
        id: user.id,
        role: user.role,
        token: this.getJwtToken({
          email: user.email,
          role: user.role,
          id: user.id,
        }),
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  /**
   * Logs in a user by verifying their email and password, and returns a JWT token if successful.
   *
   * @param loginUserDto - The DTO containing login data (email and password).
   * @returns An object containing the JWT token, user role, and id.
   * @throws UnauthorizedException if the email or password is invalid.
   */
  async login(loginUserDto: LoginUserDto): Promise<{
    token: string;
    role: string;
    id: string;
  }> {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true, role: true },
    });

    if (!user) {
      throw new UnauthorizedException(
        "Les informations d'identification ne sont pas valides (e-mail)",
      );
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException(
        "Les informations d'identification ne sont pas valides (mot de passe)",
      );
    }

    return {
      token: this.getJwtToken({
        email: user.email,
        role: user.role,
        id: user.id,
      }),
      role: user.role,
      id: user.id,
    };
  }

  /**
   * Initiates the forgot password process by sending an email with a reset token.
   *
   * @param forgotPasswordDto - The DTO containing the user's email for password reset.
   * @returns An object containing the status and message about the email sent.
   * @throws NotFoundException if no user is found with the provided email.
   * @throws BadRequestException if the recipient email address is invalid.
   * @throws ServiceUnavailableException if the SMTP server is unreachable.
   * @throws InternalServerErrorException for other unexpected email sending errors.
   */
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<string> {
    const { email } = forgotPasswordDto;

    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(
        `Aucun utilisateur n'a été trouvé avec cet email.`,
      );
    }

    try {
      const token = this.getJwtToken({
        email: user.email,
        role: user.role,
        id: user.id,
      });

      return await this.customMailerService.sendEmail(
        email,
        'Changement de mot de passe',
        token,
      );
    } catch (error) {
      if (error.responseCode === 550) {
        throw new BadRequestException('Invalid recipient email address.');
      } else if (error.code === 'ECONNREFUSED') {
        throw new ServiceUnavailableException(
          'Could not connect to the SMTP server.',
        );
      } else if (error.code === 'ENOTFOUND') {
        throw new ServiceUnavailableException('SMTP server not found.');
      } else {
        throw new InternalServerErrorException(
          'An unexpected error occurred while sending the email.',
        );
      }
    }
  }

  /**
   * Resets the user's password if the provided token is valid.
   *
   * @param token - The JWT token provided in the reset email.
   * @param forgotPasswordDto - The DTO containing the new password.
   * @returns An object containing the status, user, and a message indicating success.
   * @throws BadRequestException if the token is expired or invalid.
   */
  async resetPassword(
    token: string,
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<User> {
    const { password } = forgotPasswordDto;
    try {
      const user = await this.jwtService.verify(token);

      if (user) {
        return await this.userService.update(user.id, user, { password });
      }
    } catch (error) {
      throw new BadRequestException(`Le lien a expiré ou il n'est pas valable`);
    }
  }

  /**
   * Updates the user's password after verifying their current password.
   *
   * @param updatePasswordDto - The DTO containing the current and new password.
   * @param user - The currently authenticated user.
   * @returns An object containing the status and a message indicating success.
   * @throws UnauthorizedException if the current password is incorrect.
   */
  async updatePassword(
    updatePassword: UpdatePasswordDto,
    user: User,
  ): Promise<string> {
    const { newPassword, password } = updatePassword;
    await this.login({ email: user.email, password });

    await this.userService.update(user.id, user, { password: newPassword });

    return 'Mot de passe mise a jour';
  }

  /**
   * Generates a JWT token with the provided payload.
   *
   * @param payload - The payload containing user data for the JWT token.
   * @returns The signed JWT token as a string.
   */
  private getJwtToken(payload: JwtPayload): string {
    const token = this.jwtService.sign(payload);

    return token;
  }

  /**
   * Handles exceptions by logging them and throwing appropriate HTTP exceptions.
   *
   * @param error - The error object containing details about the exception.
   * @throws ConflictException if the error code indicates a duplicate entry.
   * @throws InternalServerErrorException for other unexpected server errors.
   */
  private handleExceptions(error: any): never {
    if (error.code === '23505') {
      throw new ConflictException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException(error.response.message);
  }
}
