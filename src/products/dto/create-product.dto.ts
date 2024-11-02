import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
  Min,
  Max,
  IsNotEmpty,
  IsInt,
} from 'class-validator';

class CategoryProduct {
  @ApiProperty({ example: 1, description: 'ID of the category' })
  @IsInt()
  id: number;
}

export class CreateProductDto {
  @ApiProperty({ example: 'Ficus', description: 'Name of the product' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: 'ficus',
    description: 'Slug of the product (optional)',
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    example: 'Ficus Benjamina',
    description: 'Scientific name of the product',
  })
  @IsString()
  @IsNotEmpty()
  scientific_name?: string;

  @ApiPropertyOptional({
    example: '10-15 ft',
    description: 'Maturity height of the product (optional)',
  })
  @IsString()
  @IsOptional()
  maturity_height?: string;

  @ApiPropertyOptional({
    example: '5-10 ft',
    description: 'Maturity width of the product (optional)',
  })
  @IsString()
  @IsOptional()
  maturity_width?: string;

  @ApiPropertyOptional({
    example: 'Moraceae',
    description: 'Family of the plant (optional)',
  })
  @IsString()
  @IsOptional()
  family?: string;

  @ApiPropertyOptional({
    example: 'Tropical Asia',
    description: 'Origin of the plant (optional)',
  })
  @IsString()
  @IsOptional()
  origin?: string;

  @ApiPropertyOptional({
    example: 'White',
    description: 'Flower color (optional)',
  })
  @IsString()
  @IsOptional()
  flower_color?: string;

  @ApiPropertyOptional({
    example: 'Green',
    description: 'Leaf color (optional)',
  })
  @IsString()
  @IsOptional()
  leaf_color?: string;

  @ApiPropertyOptional({
    example: 'Indoor plant care instructions',
    description: 'Additional description (optional)',
  })
  @IsString()
  @IsOptional()
  description1?: string;

  @ApiPropertyOptional({
    example: 'Special handling instructions',
    description: 'Secondary description (optional)',
  })
  @IsString()
  @IsOptional()
  description2?: string;

  @ApiPropertyOptional({
    example: 'Medium',
    description: 'Size of the plant (optional)',
  })
  @IsString()
  @IsOptional()
  size?: string;

  @ApiPropertyOptional({
    example: 'Plastic Pot',
    description: 'Type of pot (optional)',
  })
  @IsString()
  @IsOptional()
  pot?: string;

  @ApiPropertyOptional({
    example: 50,
    description: 'Stock quantity (optional)',
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;

  @ApiPropertyOptional({
    example: 15.99,
    description: 'Price of the product (optional)',
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
    example: 20,
    description: 'VAT percentage (optional)',
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  vat?: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Product availability status (optional)',
  })
  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @ApiPropertyOptional({
    example: 'High',
    description: 'Yield of the plant (optional)',
  })
  @IsString()
  @IsOptional()
  yield?: string;

  @ApiPropertyOptional({
    example: '5-9',
    description: 'Hardiness zone (optional)',
  })
  @IsString()
  @IsOptional()
  hardiness_zone?: string;

  @ApiPropertyOptional({
    example: 'Medium',
    description: 'Water requirement (optional)',
  })
  @IsString()
  @IsOptional()
  water_requirement?: string;

  @ApiPropertyOptional({
    example: 'Full Sun',
    description: 'Exposure requirement (optional)',
  })
  @IsString()
  @IsOptional()
  exposure?: string;

  @ApiPropertyOptional({
    example: 'Good',
    description: 'Ground cover power (optional)',
  })
  @IsString()
  @IsOptional()
  ground_cover_power?: string;

  @ApiPropertyOptional({
    example: 'Shrub',
    description: 'Strate of the plant (optional)',
  })
  @IsString()
  @IsOptional()
  strate?: string;

  @ApiPropertyOptional({
    example: 'Evergreen',
    description: 'Type of foliage (optional)',
  })
  @IsString()
  @IsOptional()
  foliage?: string;

  @ApiPropertyOptional({
    example: ['image1.jpg', 'image2.jpg'],
    description: 'Array of media (optional)',
  })
  @IsArray()
  @IsOptional()
  media?: string[];

  @ApiPropertyOptional({
    type: [CategoryProduct],
    description: 'Array of categories associated with the product (optional)',
  })
  @IsArray()
  @IsOptional()
  categories: CategoryProduct[];
}
