import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderHasProductDto } from './dto/create-order-has_product.dto';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderHasProduct } from './entities/order_has_product.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from '../common/dto/pagination-dto';
import { OrderWithProductsResponseDto } from './dto/order-response.dto';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger('Product');
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderHasProduct)
    private readonly orderHasProductRepository: Repository<OrderHasProduct>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}
  async createOrder(
    user: User,
    createOrderDto: CreateOrderDto,
  ): Promise<string> {
    try {
      const order = this.orderRepository.create({
        ...createOrderDto,
        user: user,
      });

      const orderResponse = await this.orderRepository.save(order);

      return orderResponse.id;
    } catch (error) {
      console.log(error);
      this.handleExceptions(error);
    }
  }

  async createOrderHasProduct(
    createOrderHasProductDto: CreateOrderHasProductDto,
  ): Promise<string> {
    const { product_id, order_id, ...rest } = createOrderHasProductDto;
    try {
      const product = await this.productsRepository.findOneBy({
        id: product_id,
      });
      if (!product) {
        throw new NotFoundException(`Product with ID ${product_id} not found`);
      }

      const order = await this.orderRepository.findOne({
        where: { id: order_id },
      });
      if (!order) {
        throw new NotFoundException(`Order with ID ${order_id} not found`);
      }

      const orderHasProduct = this.orderHasProductRepository.create({
        product: product,
        order: order,
        ...rest,
      });

      await this.orderHasProductRepository.save(orderHasProduct);

      return order_id;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<{
    orders: OrderWithProductsResponseDto[];
    totalPages: number;
    totalOrders: number;
  }> {
    const {
      offset = 0,
      limit = 15,
      status = ['en cours', 'validée'],
    } = paginationDto;

    const query = this.orderRepository.createQueryBuilder('order');

    if (status && status.length > 0) {
      query.where('order.status IN (:...status)', { status });
    } else {
      query.where('order.status IN (:...status)', { status });
    }

    query
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderHasProducts', 'orderHasProducts')
      .leftJoinAndSelect('orderHasProducts.product', 'product')
      .leftJoinAndSelect('product.categories', 'categories')
      .leftJoinAndSelect('product.media', 'media');

    const totalOrders = await query.getCount();

    const ordersQuery = query.take(limit).skip(offset);

    const orders = await ordersQuery.getMany();

    const totalPages = Math.ceil(totalOrders / limit);

    return {
      orders: orders.map((order) => this.transformOrderStructure(order)),
      totalPages,
      totalOrders,
    };
  }

  async findOrdersByUser(
    id: string,
    paginationDto: PaginationDto,
  ): Promise<{
    orders: OrderWithProductsResponseDto[];
    totalPages: number;
    totalOrders: number;
  }> {
    const { offset = 0, limit = 15 } = paginationDto;

    const orders = await this.orderRepository.find({
      where: { user: { id } },
      skip: offset,
      take: limit,
    });

    const totalOrders = await this.orderRepository.count({
      where: { user: { id } },
    });

    const totalPages = Math.ceil(totalOrders / limit);

    return {
      orders: orders.map((order) => this.transformOrderStructure(order)),
      totalPages,
      totalOrders,
    };
  }

  async findOne(id: string): Promise<OrderWithProductsResponseDto> {
    const order: Order = await this.orderRepository.findOne({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException(`Order with id: ${id} not found`);
    }
    return this.transformOrderStructure(order);
  }

  async update(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderWithProductsResponseDto> {
    const { status } = updateOrderDto;
    const order = await this.orderRepository.preload({ id, status });

    if (!order) {
      throw new NotFoundException(`Order with id #${id} not found`);
    }

    const response = await this.orderRepository.save(order);

    const updatedOrder = await this.findOne(response.id);

    return updatedOrder;
  }

  async remove(id: string): Promise<string> {
    const order = await this.orderRepository.delete(id);
    if (order.affected > 0) {
      return `Order with id #${id} has been deleted`;
    } else {
      throw new NotFoundException(`Order with id #${id} not found`);
    }
  }

  private transformOrderStructure(order: Order): OrderWithProductsResponseDto {
    return {
      id: order.id,
      reference: order.reference,
      total_price: +order.total_price,
      status: order.status,
      createdAt: order.createdAt,
      user: {
        id: order.user.id,
        role: order.user.role,
        first_name: order.user.first_name,
        last_name: order.user.last_name,
        email: order.user.email,
        phone: order.user.phone,
        isActive: order.user.isActive,
        createdAt: order.user.createdAt,
      },
      orderHasProducts: order.orderHasProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
        price_time_order: +product.price_time_order,
        vat: product.vat,
        product: {
          id: product.product.id,
          name: product.product.name,
          price: product.product.price,
          stock: product.product.stock,
          media: product.product.media[0].url,
          category: product.product.categories.map((category) => ({
            value: category.value,
          })),
        },
      })),
    };
  }

  async deleteAllOrders() {
    const query = this.orderRepository.createQueryBuilder();

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  private handleExceptions(error: any) {
    if (error.code === '23505') {
      throw new ConflictException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException(error.response.message);
  }
}
