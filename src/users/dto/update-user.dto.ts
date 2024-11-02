import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
    minLength: 2,
    maxLength: 50,
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(2)
  @MaxLength(50)
  first_name?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
    minLength: 2,
    maxLength: 50,
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  last_name?: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'The email of the user',
    maxLength: 50,
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(50)
  email?: string;

  @ApiProperty({
    example: 'Password123*',
    description: 'The password of the user',
    maxLength: 50,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password?: string;

  @ApiProperty({
    example: 'user',
    description: 'The role of the user (optional). Valid roles [admin, user]',
    required: false,
  })
  @IsString()
  @IsOptional()
  role?: string;

  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  phone?: string;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the user is active (optional)',
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
