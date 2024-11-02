import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderHasProductDto } from './dto/create-order-has_product.dto';
import { PaginationDto } from 'src/common/dto/pagination-dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreateOrderResponse,
  ApiCreateOrderHasProductResponse,
  ApiGetOrdersByUserResponse,
  ApiDeleteOrderResponse,
  ApiGetAllOrdersResponse,
  ApiGetOneOrderResponse,
  ApiUpdateOrderResponse,
} from './decorators';
import { GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { OrderWithProductsResponseDto } from './dto/order-response.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * Creates a new order.
   *
   * @param createOrderDto - Data Transfer Object (DTO) for creating an order.
   * @param user - The authenticated user making the request.
   * @returns An object containing the status code, the created order's ID, and a success message.
   */
  @Post()
  @Auth(ValidRoles.admin, ValidRoles.user)
  @ApiCreateOrderResponse()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User,
  ): Promise<{ status: number; orderId: string; message: string }> {
    const response = await this.ordersService.createOrder(user, createOrderDto);

    return {
      status: 201,
      orderId: response,
      message: 'Order created successfuly',
    };
  }

  /**
   * Creates a relationship between an order and a product.
   *
   * @param createOrderHasProductDto - DTO for creating the association between an order and a product.
   * @returns An object indicating the success of the operation.
   */
  @Post('products')
  @Auth(ValidRoles.admin, ValidRoles.user)
  @ApiCreateOrderHasProductResponse()
  async createOrderHasProduct(
    @Body() createOrderHasProductDto: CreateOrderHasProductDto,
  ): Promise<{ status: number; message: string; orderId: string }> {
    const response = await this.ordersService.createOrderHasProduct(
      createOrderHasProductDto,
    );

    return {
      status: 201,
      message: 'OrderHasProduct created successfuly.',
      orderId: response,
    };
  }

  /**
   * Retrieves all orders, with pagination.
   *
   * @param paginationDto - DTO for pagination options (e.g., page, limit).
   * @returns A paginated list of all orders, including total pages and total orders.
   */
  @Get()
  @Auth(ValidRoles.admin)
  @ApiGetAllOrdersResponse()
  async findAll(@Query() paginationDto: PaginationDto): Promise<{
    status: number;
    message: string;
    orders: OrderWithProductsResponseDto[];
    totalPages: number;
    totalOrders: number;
  }> {
    const response = await this.ordersService.findAll(paginationDto);

    return {
      status: 200,
      message: 'Orders retrieved successfully.',
      ...response,
    };
  }

  /**
   * Retrieves all orders made by a specific user, with pagination.
   *
   * @param id - The UUID of the user whose orders are being retrieved.
   * @param paginationDto - DTO for pagination options.
   * @returns A paginated list of orders made by the specified user, including total pages and total orders.
   */
  @Get('user/:id')
  @Auth(ValidRoles.admin, ValidRoles.user)
  @ApiGetOrdersByUserResponse()
  async findOrdersByUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<{
    status: number;
    message: string;
    orders: OrderWithProductsResponseDto[];
    totalPages: number;
    totalOrders: number;
  }> {
    const response = await this.ordersService.findOrdersByUser(
      id,
      paginationDto,
    );

    return {
      status: 200,
      message: 'Orders retrieved successfully.',
      ...response,
    };
  }

  /**
   * Retrieves a specific order by its ID.
   *
   * @param id - The UUID of the order.
   * @returns The order along with its associated products.
   */
  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.user)
  @ApiGetOneOrderResponse()
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<{
    status: number;
    message: string;
    order: OrderWithProductsResponseDto;
  }> {
    const response = await this.ordersService.findOne(id);

    return {
      status: 200,
      message: 'Order updated successfully',
      order: response,
    };
  }

  /**
   * Updates an existing order.
   *
   * @param id - The UUID of the order to update.
   * @param updateOrderDto - DTO containing updated order data.
   * @returns The updated order along with a status message.
   */
  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.user)
  @ApiUpdateOrderResponse()
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<{
    status: number;
    message: string;
    order: OrderWithProductsResponseDto;
  }> {
    const response = await this.ordersService.update(id, updateOrderDto);

    return {
      status: 200,
      message: 'Order updated successfully',
      order: response,
    };
  }

  /**
   * Deletes an order by its ID.
   *
   * @param id - The UUID of the order to delete.
   * @returns A confirmation message indicating the deletion success.
   */
  @Delete(':id')
  @Auth(ValidRoles.admin)
  @ApiDeleteOrderResponse()
  async remove(
    @Param('id') id: string,
  ): Promise<{ status: number; message: string }> {
    const response = await this.ordersService.remove(id);

    return { status: 200, message: response };
  }
}
