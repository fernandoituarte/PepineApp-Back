import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination-dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';
import { ApiTags } from '@nestjs/swagger';
import { ProductResponseDto } from './dto';
import {
  ApiCreateProductResponse,
  ApiDeleteProductResponse,
  ApiGetAllProductsResponse,
  ApiGetOneProductResponse,
  ApiUpdateProductResponse,
} from './decorators';
import { Product } from './entities/product.entity';
import { GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Creates a new product (Admin access only).
   *
   * @param createProductDto - Data Transfer Object (DTO) for creating a product.
   * @returns An object containing the status, message, and the created product.
   */
  @Post()
  @Auth(ValidRoles.admin)
  @ApiCreateProductResponse()
  async create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
  ): Promise<{
    status: number;
    message: string;
    product: Product;
  }> {
    console.log(user);
    const response = await this.productsService.create(createProductDto, user);

    return {
      status: 201,
      message: 'The product has been successfully registered.',
      product: response,
    };
  }

  /**
   * Retrieves a paginated list of all products.
   *
   * @param paginationDto - DTO for pagination options (e.g., page, limit).
   * @returns An object containing the status, message, a list of products, and the total number of pages.
   */
  @Get()
  @ApiGetAllProductsResponse()
  async findAll(@Query() paginationDto: PaginationDto): Promise<{
    status: number;
    message: string;
    products: ProductResponseDto[];
    totalPages: number;
  }> {
    const response = await this.productsService.findAll(paginationDto);

    return {
      status: 200,
      message: 'Products retrieved successfully.',
      ...response,
    };
  }

  /**
   * Retrieves a specific product by its ID.
   *
   * @param id - The ID of the product.
   * @returns An object containing the status, message, and the product details.
   */
  @Get(':id')
  @ApiGetOneProductResponse()
  async findOne(
    @Param('id') id: string,
  ): Promise<{ status: number; message: string; product: ProductResponseDto }> {
    const response = await this.productsService.findOne(id);

    return {
      status: 200,
      message: 'Product retrieved successfully.',
      product: response,
    };
  }

  /**
   * Updates an existing product by its ID (Admin access only).
   *
   * @param id - The ID of the product to update.
   * @param updateProductDto - DTO containing updated product data.
   * @returns An object containing the status, message, and the updated product.
   */
  @Patch(':id')
  @Auth(ValidRoles.admin)
  @ApiUpdateProductResponse()
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<{
    status: number;
    message: string;
    product: ProductResponseDto;
  }> {
    const response = await this.productsService.update(id, updateProductDto);

    return {
      status: 200,
      message: 'Product updated successfully',
      product: response,
    };
  }
  /**
   * Deletes a product by its ID (Admin access only).
   *
   * @param id - The ID of the product to delete.
   * @returns An object containing the status and a success message.
   */
  @Delete(':id')
  @Auth(ValidRoles.admin)
  @ApiDeleteProductResponse()
  async remove(
    @Param('id') id: string,
  ): Promise<{ status: number; message: string }> {
    const response = await this.productsService.remove(id);

    return { status: 200, message: response };
  }
}
