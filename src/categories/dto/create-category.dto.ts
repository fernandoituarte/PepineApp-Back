import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Plantes médicinales',
    description: 'The title of the category',
    minLength: 2,
    maxLength: 50,
    required: true,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    example:
      'Les plantes médicinales sont utilisées depuis des siècles pour leurs propriétés thérapeutiques. Elles peuvent être cultivées pour préparer des remèdes naturels et sont souvent utilisées en phytothérapie.',
    description: 'The description of the category',
    required: true,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example:
      'http://localhost:3000/media/f445d64c-e089-4814-8688-4263e0175073.jpg',
    description: 'The url of the image',
    required: true,
  })
  @IsString()
  @IsOptional()
  media?: string;
}
