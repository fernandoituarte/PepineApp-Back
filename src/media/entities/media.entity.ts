import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @ManyToOne(() => Product, (product) => product.media, { onDelete: 'CASCADE' })
  product: Product;

  @OneToOne(() => Category, (category) => category.media, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  category: Category;

  @CreateDateColumn()
  createdAt: Date;
}
