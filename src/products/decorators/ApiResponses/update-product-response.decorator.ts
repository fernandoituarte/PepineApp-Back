import { applyDecorators } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiUpdateProductResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update a product' }),
    ApiCookieAuth(),
    ApiResponse({
      status: 200,
      description: 'Product updated successfully',
      schema: {
        example: {
          statusCode: 200,
          message: 'Product updated successfully',
          product: {
            name: 'Ficus',
            slug: 'ficus',
            scientific_name: 'Ficus Benjamina',
            maturity_height: '10-15 ft',
            maturity_width: '5-10 ft',
            family: 'Moraceae',
            origin: 'Tropical Asia',
            flower_color: 'White',
            leaf_color: 'Green',
            description1: 'Indoor plant care instructions',
            description2: 'Special handling instructions',
            size: 'Medium',
            pot: 'Plastic Pot',
            stock: 50,
            price: 15.99,
            vat: 20,
            status: true,
            user: {
              id: '29ecff6f-0f25-40c0-b3d1-3dbac22c753c',
              first_name: 'John',
              last_name: 'Doe',
            },
            yield: 'High',
            hardiness_zone: '5-9',
            water_requirement: 'Medium',
            exposure: 'Full Sun',
            ground_cover_power: 'Good',
            strate: 'Shrub',
            foliage: 'Evergreen',
            media: ['image1.jpg', 'image2.jpg'],
            categories: [
              {
                id: 1,
              },
            ],
          },
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: `Unauthorized: Insufficient permissions.`,
      schema: {
        example: {
          statusCode: 401,
          message: `Insufficient permissions to view this information.`,
          error: 'Unauthorized',
        },
      },
    }),
    ApiForbiddenResponse({
      description:
        'Forbidden: You do not have permission to access this resource.',
      schema: {
        example: {
          statusCode: 403,
          message: 'User Jhon Doe need a valid role: [admin]',
          error: 'Forbidden',
        },
      },
    }),
    ApiNotFoundResponse({
      status: 404,
      description: 'No products found',
      schema: {
        example: {
          statusCode: 404,
          message:
            'Product with id 1fc51234-5678-9100-8645-264558ad7710 not found',
          error: 'Not Found',
        },
      },
    }),
    ApiConflictResponse({
      status: 409,
      description: 'Key (key)=(value) already exists.',
      schema: {
        example: {
          statusCode: 409,
          message: 'Key (key)=(value) already exists.',
          error: 'Conflict',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Error updating user data.',
      schema: {
        example: {
          statusCode: 500,
          message: 'Check server logs',
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
