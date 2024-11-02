import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsModule } from 'src/products/products.module';
import { AuthModule } from 'src/auth/auth.module';
import { OrdersModule } from 'src/orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    CategoriesModule,
    ProductsModule,
    AuthModule,
    OrdersModule,
    ConfigModule,
    UsersModule,
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
