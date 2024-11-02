import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { Product } from './entities/product.entity';
import { Media } from 'src/media/entities/media.entity';
import { Category } from 'src/categories/entities/category.entity';

import { CreateProductDto, UpdateProductDto, ProductResponseDto } from './dto';
import { PaginationDto } from '../common/dto/pagination-dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ProductsService {
  /** Logger to record events and debugging information */
  private readonly logger = new Logger('Product');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Creates a new product.
   * @param createProductDto - DTO containing the data needed to create a product.
   * @returns The newly created product.
   * @throws NotFoundException if any specified category is not found.
   * @throws InternalServerErrorException in case of unexpected errors.
   */
  async create(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    const { categories = [], media = [], ...rest } = createProductDto;

    try {
      /**  Retrieve categories associated with the product */
      const productCategories = await Promise.all(
        categories.map(async (cat) => {
          const categoryId = typeof cat === 'number' ? cat : cat.id;
          const category = await this.categoriesRepository.findOneBy({
            id: categoryId,
          });
          if (!category) {
            throw new NotFoundException(
              `Category with id ${categoryId} not found`,
            );
          }
          return category;
        }),
      );
      /**  Create media entities (images) associated with the product */
      const productMedia = media.length
        ? media.map((image) => this.mediaRepository.create({ url: image }))
        : [];
      /**  Create a new product instance */
      const product = this.productRepository.create({
        ...rest,
        user,
        categories: productCategories,
        media: productMedia,
      });

      /**  Save the product to the database */
      await this.productRepository.save(product);

      /**  Return the newly created product */
      const response = await this.productRepository.findOne({
        where: { id: product.id },
      });

      return response;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  /**
   * Retrieves all products with pagination.
   * @param paginationDto - DTO defining the pagination.
   * @returns A list of products.
   * @throws NotFoundException if no products are found.
   */
  async findAll(paginationDto: PaginationDto): Promise<{
    products: ProductResponseDto[];
    totalProducts: number;
    totalPages: number;
  }> {
    const { limit = 20, offset = 0 } = paginationDto;

    const totalProducts = await this.productRepository.count();

    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: ['media', 'categories'],
    });

    // Calcular el número total de páginas
    const totalPages = Math.ceil(totalProducts / limit);

    return {
      products: products.map((product) =>
        this.transformProductStructure(product),
      ),
      totalProducts,
      totalPages,
    };
  }

  /**
   * Searches for a product by its ID (UUID), name, or slug.
   * @param term - The search term (can be a UUID, name, or slug).
   * @returns The found product.
   * @throws NotFoundException if the product is not found.
   */
  async findOne(term: string): Promise<ProductResponseDto> {
    let product: Product | undefined;

    if (isUUID(term)) {
      product = await this.productRepository.findOne({
        where: { id: term },
        relations: ['media', 'categories', 'user'],
      });
    } else {
      product = await this.productRepository
        .createQueryBuilder('prod')
        .leftJoinAndSelect('prod.media', 'media')
        .leftJoinAndSelect('prod.categories', 'categories')
        .leftJoinAndSelect('prod.user', 'user')
        .where('UPPER(prod.name) = :name OR prod.slug = :slug', {
          name: term.toUpperCase(),
          slug: term.toLowerCase(),
        })
        .getOne();
    }
    if (!product) {
      throw new NotFoundException(`Product not found`);
    }

    const productResponse = this.transformProductStructure(product);

    return productResponse;
  }

  /**
   * Updates an existing product.
   * @param id - The ID of the product to update.
   * @param updateProductDto - DTO with the data to update the product.
   * @returns The updated product.
   * @throws NotFoundException if the product is not found.
   * @throws InternalServerErrorException in case of errors during the transaction.
   */
  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const { media, categories, ...toUpdate } = updateProductDto;
    const product = await this.productRepository.preload({ id, ...toUpdate });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (media) {
        /** Remove the current media relations. */
        await queryRunner.manager.delete(Media, { product: { id } });

        /** Create the new media instances.*/
        product.media = media.map((img) =>
          this.mediaRepository.create({ url: img }),
        );
      }

      if (categories) {
        /** Remove the relations in the join table. */
        await queryRunner.manager
          .createQueryBuilder()
          .relation(Product, 'categories')
          .of(product)
          .remove(product.categories);

        /** Assign the new categories. */
        product.categories = await Promise.all(
          categories.map((cat) => {
            return this.categoriesRepository.findOneBy({ id: cat.id });
          }),
        );
      }

      await queryRunner.manager.save(product);
      await queryRunner.commitTransaction();

      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handleExceptions(error);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Deletes a product by its ID.
   * @param id - The ID of the product to delete.
   * @returns A confirmation message.
   * @throws NotFoundException if the product is not found.
   */
  async remove(id: string): Promise<string> {
    const products = await this.productRepository.delete(id);

    if (products.affected > 0) {
      return `Product with id #${id} has been deleted`;
    } else {
      throw new NotFoundException(`Product with id #${id} not found`);
    }
  }

  /**
   * Deletes all products from the database.
   * @returns The result of the delete operation.
   * @throws InternalServerErrorException in case of errors during the operation.
   */
  async deleteAllProducts(): Promise<DeleteResult> {
    const query = this.productRepository.createQueryBuilder();

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  /**
   * Transforms the structure of a product to fit the expected response format.
   * @param product - The product to transform.
   * @returns The transformed product.
   */
  private transformProductStructure(product: Product): ProductResponseDto {
    delete product.user.password;
    delete product.user.email;
    delete product.user.role;
    delete product.user.isActive;
    delete product.user.phone;
    delete product.user.createdAt;
    delete product.user.updatedAt;
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      scientific_name: product.scientific_name,
      maturity_height: product.maturity_height,
      maturity_width: product.maturity_width,
      family: product.family,
      origin: product.origin,
      flower_color: product.flower_color,
      leaf_color: product.leaf_color,
      description1: product.description1,
      description2: product.description2,
      size: product.size,
      pot: product.pot,
      stock: product.stock,
      price: product.price,
      vat: product.vat,
      status: product.status,
      user: product.user,
      yield: product.yield,
      hardiness_zone: product.hardiness_zone,
      water_requirement: product.water_requirement,
      exposure: product.exposure,
      ground_cover_power: product.ground_cover_power,
      strate: product.strate,
      foliage: product.foliage,
      media: product.media.map((image) => ({
        id: image.id,
        url: image.url,
      })),
      categories: product.categories.map((category) => ({
        id: category.id,
        value: category.value,
      })),
    };
  }

  /**
   * Handles specific exceptions related to database operations.
   * @param error - The error to handle.
   * @throws BadRequestException if the error is related to a duplicate key (code 23505).
   * @throws InternalServerErrorException for other unhandled errors.
   */
  private handleExceptions(error: any): never {
    if (error.code === '23505') {
      throw new ConflictException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException(error.response.message);
  }
}
