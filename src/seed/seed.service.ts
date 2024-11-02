import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { AuthService } from 'src/auth/auth.service';
import {
  seedProducts,
  seedCategories,
  seedOrders,
  seedUsers,
  seedOrdersHasProduct,
} from './data/seed';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class SeedService {
  private logger = new Logger('Seed');
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly ordersService: OrdersService,
    private readonly configService: ConfigService,
  ) {}

  async runSeed() {
    try {
      await this.cleanDatabase();

      const categories = await this.insertNewCategories();
      const user = await this.insertNewUsers();
      const products = await this.insertNewProducts(user, categories);
      const orders = await this.insertNewOrders(user);
      await this.insertNewOrderHasProduct(orders, products);
      return 'Seed executed';
    } catch (error) {
      this.logger.error(error);
      await this.cleanDatabase();
      throw new InternalServerErrorException(
        'Seed failed, all changes have been reverted',
      );
    }
  }

  private async cleanDatabase() {
    await this.categoriesService.deleteAllCategories();
    await this.usersService.deleteAllUsers();
    await this.productsService.deleteAllProducts();
    await this.ordersService.deleteAllOrders();
  }

  private async insertNewCategories() {
    const insertPromises = seedCategories.map((category) => {
      if (!category.media.startsWith('http')) {
        category.media = `${this.configService.get('HOST_NAME')}/media/${category.media}`;
      }

      return this.categoriesService.create(category);
    });

    return await Promise.all(insertPromises);
  }

  private async insertNewUsers() {
    const insertPromises = seedUsers.map((user) =>
      this.authService.create(user),
    );

    const allUsers = await Promise.all(insertPromises);
    const admin = allUsers.find((user) => user.role === 'admin');

    const user = await this.usersService.findOne(admin.id);

    return user;
  }

  private async insertNewProducts(user: User, categories) {
    const insertPromises = seedProducts.map((product) => {
      product.categories = [categories[0].id];
      product.media = product.media.map((image) => {
        if (!image.startsWith('http')) {
          return `${this.configService.get('HOST_NAME')}/media/${image}`;
        }
        return image;
      });
      return this.productsService.create(product, user);
    });

    return await Promise.all(insertPromises);
  }

  private async insertNewOrders(user: User) {
    const insertPromises = seedOrders.map((order) => {
      return this.ordersService.createOrder(user, order);
    });

    return await Promise.all(insertPromises);
  }

  private async insertNewOrderHasProduct(orders, products) {
    const insertPromises = seedOrdersHasProduct.map((orderProduct, index) => {
      orderProduct.order_id = orders[index].order_id;
      orderProduct.product_id = products[index].id;
      return this.ordersService.createOrderHasProduct(orderProduct);
    });

    await Promise.all(insertPromises);

    return true;
  }
}
