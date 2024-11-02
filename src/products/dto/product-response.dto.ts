import {
  IsString,
  IsNumber,
  IsBoolean,
  IsArray,
  IsUUID,
  Min,
  Max,
  IsNotEmpty,
  IsInt,
} from 'class-validator';
import { User } from 'src/auth/entities/user.entity';

class CategoryProduct {
  @IsInt()
  id: number;
}
class Media {
  @IsInt()
  id: number;

  @IsString()
  url: string;
}

export class ProductResponseDto {
  @IsUUID()
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  @IsNotEmpty()
  scientific_name: string;

  @IsString()
  maturity_height: string;

  @IsString()
  maturity_width: string;

  @IsString()
  family: string;

  @IsString()
  origin: string;

  @IsString()
  flower_color: string;

  @IsString()
  leaf_color: string;

  @IsString()
  @IsNotEmpty()
  description1: string;

  @IsString()
  description2: string;

  @IsString()
  size: string;

  @IsString()
  pot: string;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  vat: number;

  @IsBoolean()
  status: boolean;

  @IsUUID()
  @IsNotEmpty()
  user: User;

  @IsString()
  yield: string;

  @IsString()
  hardiness_zone: string;

  @IsString()
  water_requirement: string;

  @IsString()
  exposure: string;

  @IsString()
  ground_cover_power: string;

  @IsString()
  strate: string;

  @IsString()
  foliage: string;

  @IsArray()
  media: Media[];

  @IsArray()
  categories?: CategoryProduct[];
}
