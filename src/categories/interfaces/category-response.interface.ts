import { Product } from 'src/products/entities/product.entity';
import { Category } from '../entities/category.entity';

export interface CategoryResponse {
  status: number;
  message: string;
  category: Category;
}

export interface CategoriesResponse {
  status: number;
  message: string;
  categories: Category[];
}

export interface ProductsByCategoryResponse {
  status?: number;
  message?: string;
  category: Category;
  products: Product[];
  totalPages: number;
  totalProducts: number;
}
