import {
  IsString,
  IsNumber,
  IsArray,
  IsDate,
  ValidateNested,
  IsEmail,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CategoryDto {
  @IsString()
  value: string;
}

export class ProductDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  media: string;

  @IsNumber()
  stock: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  category: CategoryDto[];
}

export class UserDto {
  @IsString()
  id: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  role: string;

  @IsString()
  phone: string;

  @IsBoolean()
  isActive: boolean;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;
}

export class OrderHasProductDto {
  @IsNumber()
  id: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price_time_order: number;

  @IsNumber()
  vat: number;

  @ValidateNested()
  @Type(() => ProductDto)
  product: ProductDto;
}

export class OrderWithProductsResponseDto {
  @IsString()
  id: string;

  @IsString()
  reference: string;
  @IsNumber()
  total_price: number;

  @IsString()
  status: string;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderHasProductDto)
  orderHasProducts: OrderHasProductDto[];
}

export class OrderResponseDto {
  @IsString()
  id: string;

  @IsNumber()
  total_price: number;

  @IsString()
  status: string;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;
}
