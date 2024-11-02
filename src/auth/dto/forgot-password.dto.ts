import { PartialType } from '@nestjs/mapped-types';
import { LoginUserDto } from './login-user.dto';
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto extends PartialType(LoginUserDto) {
  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'The email of the user',
    maxLength: 50,
  })
  @IsString()
  @IsEmail()
  email: string;
}
