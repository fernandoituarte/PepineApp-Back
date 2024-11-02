import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'The email of the user',
    maxLength: 50,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password123*',
    description: 'The password of the user',
    maxLength: 50,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;
}
