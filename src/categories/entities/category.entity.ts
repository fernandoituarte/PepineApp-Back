import { Media } from 'src/media/entities/media.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true })
  value: string;

  @Column('text', { nullable: true })
  description: string;

  @OneToOne(() => Media, (image) => image.category, {
    cascade: true,
    eager: true,
  })
  media?: Media;

  @CreateDateColumn()
  createdAt?: string;

  @UpdateDateColumn()
  updatedAt?: string;

  @ManyToMany(() => Product, (product) => product.categories, {
    onDelete: 'CASCADE',
  })
  product?: Product[];
}
