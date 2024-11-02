import { User } from 'src/auth/entities/user.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderHasProduct } from './order_has_product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  reference: string;

  @Column('numeric', {
    default: 0,
    precision: 10,
    scale: 2,
  })
  total_price: number;

  @Column('text', {
    default: 'en cours',
  })
  status: string;

  @ManyToOne(() => User, (user) => user.orders, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(
    () => OrderHasProduct,
    (orderHasProduct) => orderHasProduct.order,
    {
      cascade: true,
      eager: true,
    },
  )
  orderHasProducts: OrderHasProduct[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @BeforeInsert()
  createReferenceNumber() {
    const timestamp = Math.random().toString(30).substring(2).toUpperCase();
    this.reference = timestamp;
  }
}
