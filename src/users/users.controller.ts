import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiGetAllUsersResponse,
  ApiDeleteUserResponse,
  ApiUpdateUserResponse,
  ApiGetOneUserResponse,
} from './decorators';
import { Auth, GetUser } from 'src/auth/decorators';
import { UpdateUserDto } from 'src/auth/dto';
import { User } from 'src/auth/entities/user.entity';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';
import { PaginationDto } from 'src/common/dto/pagination-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Retrieves a paginated list of users.
   *
   * This method is protected by authentication and retrieves a list of users with pagination.
   * The number of users and total pages are returned based on the provided pagination parameters.
   * Only accessible to admin.
   *
   * @param paginationDto - The data transfer object containing pagination options (e.g., offset, limit).
   * @returns An object containing an array of users, the total number of pages, and the total number of users.
   */
  @Get('')
  @Auth(ValidRoles.admin)
  @ApiGetAllUsersResponse()
  async findAll(@Query() paginationDto: PaginationDto): Promise<{
    status: number;
    message: string;
    users: User[];
    totalPages: number;
    totalUsers: number;
  }> {
    const response = await this.usersService.findAll(paginationDto);

    return {
      status: 200,
      message: 'Users retrieved successfully.',
      ...response,
    };
  }

  /**
   * Retrieves a single user by their ID.
   *
   * This method fetches a user based on their unique UUID. The route is protected by authentication
   * and is accessible to both administrators and regular users.
   *
   * @param id - The unique identifier (UUID) of the user to retrieve.
   * @returns The user object matching the provided ID.
   */
  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.user)
  @ApiGetOneUserResponse()
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ status: number; message: string; user: User }> {
    const response = await this.usersService.findOne(id);

    return {
      status: 200,
      message: 'User retrieved successfully.',
      user: response,
    };
  }

  /**
   * Updates an existing user's data.
   *
   * This method updates the user information based on the provided user ID and the update data (DTO).
   * It is protected by authentication and accessible to both administrators and regular users.
   *
   * @param id - The unique identifier (UUID) of the user to update.
   * @param updateUserDto - The data transfer object containing the updated user information.
   * @returns The updated user object.
   */
  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.user)
  @ApiUpdateUserResponse()
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ status: number; user: User; message: string }> {
    const response = await this.usersService.update(id, user, updateUserDto);

    return {
      status: 200,
      user: response,
      message: 'User updated successfully',
    };
  }

  /**
   * Deletes a user by their ID.
   *
   * This method removes a user from the database based on their unique UUID. It is protected by
   * authentication.
   *
   * @param id - The unique identifier (UUID) of the user to delete.
   * @returns A confirmation message that the user was successfully deleted.
   */
  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.user)
  @ApiDeleteUserResponse()
  async remove(
    @Param('id') id: string,
  ): Promise<{ status: number; message: string }> {
    const response = await this.usersService.remove(id);

    return { status: 200, message: response };
  }
}
