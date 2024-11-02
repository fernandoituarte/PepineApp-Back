import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from '../common/dto/pagination-dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreateCategoryResponse,
  ApiGetAllCategoriesResponse,
  ApiGetOneCategoryResponse,
  ApiUpdateCategoryResponse,
  ApiDeleteCategoryResponse,
} from './decorators';
import {
  CategoriesResponse,
  CategoryResponse,
  ProductsByCategoryResponse,
} from './interfaces/category-response.interface';
import { ApiGetAllProductsByCategoryResponse } from './decorators/ApiResponses/get-all-products-by-category-response.decorator';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  /**
   * Creates a new category.
   *
   * @param createCategoryDto - Data required to create a new category (name, description, etc.).
   * @returns A promise that resolves to a `CategoryResponse` object with details of the created category.
   */
  @Post()
  @Auth(ValidRoles.admin)
  @ApiCreateCategoryResponse()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponse> {
    const response = await this.categoriesService.create(createCategoryDto);

    return {
      status: 201,
      message: 'Category created successfully.',
      category: response,
    };
  }

  /**
   * Retrieves all categories with pagination.
   *
   * @param paginationDto - Pagination data (page number, limit).
   * @returns A promise that resolves to a `CategoriesResponse` object containing the list of categories.
   */
  @Get()
  @ApiGetAllCategoriesResponse()
  async findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<CategoriesResponse> {
    const response = await this.categoriesService.findAll(paginationDto);

    return {
      status: 200,
      message: 'Categories retrieved successfully.',
      categories: response,
    };
  }

  /**
   * Retrieves a single category by its ID.
   *
   * @param id - The ID of the category to retrieve.
   * @returns A promise that resolves to a `CategoryResponse` object with details of the category.
   */
  @Get(':id')
  @ApiGetOneCategoryResponse()
  async findOne(@Param('id') id: number): Promise<CategoryResponse> {
    const response = await this.categoriesService.findOne(id);

    return {
      status: 200,
      message: 'Category retrieved successfully.',
      category: response,
    };
  }

  /**
   * Updates a category's details by its ID.
   *
   * @param id - The ID of the category to update.
   * @param updateCategoryDto - The new data to update the category with.
   * @returns A promise that resolves to a `CategoryResponse` object with the updated category details.
   */
  @Patch(':id')
  @ApiUpdateCategoryResponse()
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryResponse> {
    const response = await this.categoriesService.update(id, updateCategoryDto);

    return {
      status: 200,
      message: 'Category updated successfully',
      category: response,
    };
  }

  /**
   * Deletes a category by its ID.
   *
   * @param id - The ID of the category to delete.
   * @returns A promise that resolves to an object containing a status code and a success message.
   */
  @Delete(':id')
  @Auth(ValidRoles.admin)
  @ApiDeleteCategoryResponse()
  async remove(@Param('id') id: number): Promise<{
    status: number;
    message: string;
  }> {
    const response = await this.categoriesService.remove(id);

    return { status: 200, message: response };
  }

  /**
   * Retrieves all products associated with a specific category.
   *
   * @param id - The ID of the category.
   * @param paginationDto - Pagination data (page number, limit).
   * @returns A promise that resolves to a list of products associated with the category.
   */
  @Get(':id/products')
  @ApiGetAllProductsByCategoryResponse()
  async findAllProductsByCategory(
    @Param('id') id: number,
    @Query() paginationDto: PaginationDto,
  ): Promise<ProductsByCategoryResponse> {
    const response = await this.categoriesService.findAllProductsByCategory(
      id,
      paginationDto,
    );

    return {
      status: 200,
      message: 'Products retrieved successfully.',
      ...response,
    };
  }
}
