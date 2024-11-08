import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination-dto';
import { DeleteResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('Users');
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Retrieves all users with pagination support.
   * Throws a NotFoundException if no users are found.
   *
   * @param paginationDto - Contains pagination parameters (offset, limit).
   * @returns An object containing status, message, users, total pages, and total user count.
   */
  async findAll(paginationDto: PaginationDto): Promise<{
    users: User[];
    totalPages: number;
    totalUsers: number;
  }> {
    const { offset = 0, limit = 20 } = paginationDto;

    const totalUsers = await this.userRepository.count();
    const totalPages = Math.ceil(totalUsers / limit);

    const users = await this.userRepository.find({
      take: limit,
      skip: offset,
      select: [
        'id',
        'first_name',
        'last_name',
        'email',
        'role',
        'isActive',
        'phone',
        'createdAt',
        'updatedAt',
      ],
    });

    return {
      users,
      totalPages,
      totalUsers,
    };
  }
  /**
   * Finds a user by their ID.
   * Sensitive fields such as password and updatedAt are removed from the response.
   *
   * @param id - The user ID.
   * @returns The found user without sensitive information.
   * @throws NotFoundException if the user is not found.
   */
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      delete user.updatedAt;
      delete user.password;
      return user;
    } else {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  /**
   * Updates a user's information.
   * Only admin users or the user themselves can update the data.
   * Password is hashed if provided in the update DTO.
   *
   * @param id - The ID of the user to update.
   * @param currentUser - The currently logged-in user (for permissions check).
   * @param updateUserDto - The new user data.
   * @returns The updated user and a success message.
   * @throws ForbiddenException if the user is not allowed to update.
   * @throws NotFoundException if the user does not exist.
   */
  async update(
    id: string,
    currentUser: User,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const { password, ...rest } = updateUserDto;

    if (currentUser.role === 'user' && currentUser.id !== id) {
      throw new ForbiddenException(
        'You do not have permission to update this user.',
      );
    }

    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    try {
      const updatedData = {
        ...rest,
        ...(password && { password: bcrypt.hashSync(password, 10) }),
      };

      await this.userRepository
        .createQueryBuilder('user')
        .update(User)
        .set(updatedData)
        .where('id = :id', { id })
        .execute();

      const userResponse = await this.findOne(id);

      return userResponse;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  /**
   * Removes a user by their ID.
   *
   * @param id - The ID of the user to delete.
   * @returns A success message upon deletion.
   * @throws NotFoundException if the user does not exist.
   */
  async remove(id: string): Promise<string> {
    const response = await this.userRepository.delete(id);

    if (response.affected === 0) {
      throw new NotFoundException(`User with id #${id} not found`);
    }
    return `User with id #${id} has been deleted`;
  }

  /**
   * Handles database exceptions, particularly for unique constraint violations.
   * Logs the error and throws an appropriate exception.
   *
   * @param error - The error object.
   * @throws ConflictException for unique constraint violations.
   * @throws InternalServerErrorException for general errors.
   */
  private handleExceptions(error: any): never {
    if (error.code === '23505') {
      throw new ConflictException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException(error.response.message);
  }

  /**
   * Deletes all users from the database (Only used for seed).
   *
   * @returns The result of the delete operation.
   * @throws InternalServerErrorException if there is an issue during deletion.
   */
  async deleteAllUsers(): Promise<DeleteResult> {
    const query = this.userRepository.createQueryBuilder();

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleExceptions(error);
    }
  }
}
