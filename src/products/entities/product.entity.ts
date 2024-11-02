import { User } from 'src/auth/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Media } from 'src/media/entities/media.entity';
import { OrderHasProduct } from 'src/orders/entities/order_has_product.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('text', {
    unique: true,
  })
  scientific_name: string;

  @Column('text', {
    unique: true,
  })
  slug: string;

  @Column('text', {
    default: 'Non disponible',
  })
  maturity_height: string;

  @Column('text', {
    default: 'Non disponible',
  })
  maturity_width: string;

  @Column('text', {
    default: 'Non disponible',
  })
  family: string;

  @Column('text', {
    default: 'Non disponible',
  })
  origin: string;

  @Column('text', {
    default: 'Non disponible',
  })
  flower_color: string;

  @Column('text', {
    default: 'Non disponible',
  })
  leaf_color: string;

  @Column('text')
  description1: string;

  @Column('text', {
    default: 'Non disponible',
  })
  description2?: string;

  @Column('text', {
    default: 'Non disponible',
  })
  size: string;

  @Column('text', {
    default: 'Non disponible',
  })
  pot: string;

  @Column('float', {
    default: 0,
  })
  stock: number;

  @Column('float', {
    default: 0,
  })
  price: number;

  @Column('float', {
    default: 0,
  })
  vat: number;

  @Column('boolean', {
    default: false,
  })
  status: boolean;

  @ManyToOne(() => User, (user) => user.products, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column('text', {
    default: 'Non disponible',
  })
  yield: string;

  @Column('text', {
    default: 'Non disponible',
  })
  hardiness_zone: string;

  @Column('text', {
    default: 'Non disponible',
  })
  water_requirement: string;

  @Column('text', {
    default: 'Non disponible',
  })
  exposure: string;

  @Column('text', {
    default: 'Non disponible',
  })
  ground_cover_power: string;

  @Column('text', {
    default: 'Non disponible',
  })
  strate: string;

  @Column('text', {
    default: 'Non disponible',
  })
  foliage: string;

  @OneToMany(
    () => OrderHasProduct,
    (orderHasProduct) => orderHasProduct.product,
  )
  orderHasProducts: OrderHasProduct[];

  @OneToMany(() => Media, (image) => image.product, {
    cascade: true,
    eager: true,
  })
  media: Media[];

  @ManyToMany(() => Category, (category) => category.product, {
    eager: true,
  })
  @JoinTable({ name: 'product_has_category' })
  categories?: Category[];

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updatedAt?: number;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.name;
    }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '')
      .replaceAll('-', '_');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.name
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '')
      .replaceAll('-', '_');
  }
}
