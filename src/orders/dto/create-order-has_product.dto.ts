import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateOrderHasProductDto {
  @ApiProperty({
    example: '2fa67c77-6e0d-4d84-9c2f-57e01b647dee',
    description: 'Unique identifier of the product being added to the order',
    maxLength: 36,
  })
  @IsString()
  product_id: string;

  @ApiProperty({
    example: '2fa67c77-6e0d-4d84-9c2f-57e01b647dee',
    description:
      'Unique identifier of the order to which the product is being added',
    maxLength: 36,
  })
  @IsString()
  order_id: string;

  @ApiProperty({
    example: 12,
    description: 'The quantity of the product in the order',
    minimum: 1,
    maxLength: 5,
  })
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty({
    example: 13.99,
    description: 'The price of the product at the time the order was placed',
    minimum: 0.01,
  })
  @IsNumber()
  @IsPositive()
  price_time_order: number;

  @ApiProperty({
    example: 10,
    description: 'The VAT (Value Added Tax) percentage applied to the product',
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @IsPositive()
  vat: number;
}
