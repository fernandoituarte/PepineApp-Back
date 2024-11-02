import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: 13.99,
    description: 'Total price of order',
    maxLength: 50,
  })
  @IsNumber()
  @IsPositive()
  total_price?: number;

  @ApiProperty({
    example: 'En cours',
    description: 'Order status',
    maxLength: 50,
  })
  @IsString()
  @IsOptional()
  status?: string;
}
