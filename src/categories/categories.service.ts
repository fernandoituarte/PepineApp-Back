import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dto/pagination-dto';
import { Product } from 'src/products/entities/product.entity';
import { Media } from 'src/media/entities/media.entity';
import { ProductsByCategoryResponse } from './interfaces/category-response.interface';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger('CategoryService');
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { media = '', ...rest } = createCategoryDto;

    try {
      const mediaEntity = this.mediaRepository.create({ url: media });
      const savedMedia = await this.mediaRepository.save(mediaEntity);

      if (!savedMedia) {
        throw new InternalServerErrorException('Failed to save media file.');
      }

      const category = this.categoryRepository.create({
        media: savedMedia,
        ...rest,
      });
      const savedCategory = await this.categoryRepository.save(category);

      if (!savedCategory) {
        throw new InternalServerErrorException('Failed to save category.');
      }

      return savedCategory;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<Category[]> {
    const { offset = 0, limit = 20 } = paginationDto;

    const categories = await this.categoryRepository.find({
      take: limit,
      skip: offset,
    });

    if (categories.length === 0) {
      throw new NotFoundException('No categories found');
    }

    return categories;
  }

  async findAllProductsByCategory(
    id: number,
    paginationDto: PaginationDto,
  ): Promise<ProductsByCategoryResponse> {
    const { offset = 0, limit = 20 } = paginationDto;

    const products = await this.productRepository.find({
      where: { categories: { id } },
      skip: offset,
      take: limit,
    });

    const totalProducts = await this.productRepository.count({
      where: { categories: { id } },
    });
    const totalPages = Math.ceil(totalProducts / limit);

    const category = await this.findOne(id);

    return {
      products,
      totalPages,
      totalProducts,
      category,
    };
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });

    try {
      if (category) {
        return category;
      } else {
        throw new NotFoundException(`Category with id ${id} not found`);
      }
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const { media = '', ...rest } = updateCategoryDto;

    try {
      const category = await this.categoryRepository.findOneBy({ id });
      if (!category) {
        throw new NotFoundException(`Category with id #${id} not found`);
      }

      if (media !== '') {
        const mediaEntity = this.mediaRepository.create({ url: media });
        const savedMedia = await this.mediaRepository.save(mediaEntity);
        category.media = savedMedia;
      }

      Object.assign(category, rest);

      const categoryResponse = await this.categoryRepository.save(category);
      return categoryResponse;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: number): Promise<string> {
    const response = await this.categoryRepository.delete(id);

    if (response.affected === 0) {
      throw new NotFoundException(`Category with id #${id} not found`);
    }
    return `Category with id #${id} has been deleted`;
  }

  async deleteAllCategories() {
    const query = this.categoryRepository.createQueryBuilder();

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any): never {
    if (error.code === '23505') {
      throw new ConflictException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException(error.response.message);
  }
}
