import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderHasProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.orderHasProducts, {
    eager: true,
    onDelete: 'SET NULL',
  })
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderHasProducts, {
    onDelete: 'CASCADE',
  })
  order: Order;

  @Column('float', {
    default: 0,
  })
  quantity: number;

  @Column('numeric', {
    default: 0,
    precision: 10,
    scale: 2,
  })
  price_time_order: number;

  @Column()
  vat: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
