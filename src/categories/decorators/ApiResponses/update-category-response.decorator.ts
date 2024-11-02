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

export const ApiUpdateCategoryResponse = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update a category',
      description: 'Allows an admin to update the details of a category by ID.',
    }),
    ApiCookieAuth(),
    ApiResponse({
      status: 200,
      description: 'Product updated successfully',
      schema: {
        example: {
          status: 200,
          message: 'Category updated successfully',
          category: {
            id: 69,
            value: 'Plantes médicinales',
            description:
              'Les plantes médicinales sont utilisées depuis des siècles pour leurs propriétés thérapeutiques. Elles peuvent être cultivées pour préparer des remèdes naturels et sont souvent utilisées en phytothérapie.',
            createdAt: '2024-09-09T19:42:31.712Z',
            updatedAt: '2024-09-09T19:42:31.712Z',
            media: {
              url: 'http://localhost:3000/api/media/f445d64c-e089-4814-8688-4263e0175073.jpg',
              id: 313,
              createdAt: '2024-10-15T17:59:16.629Z',
              updatedAt: '2024-10-15T17:59:16.836Z',
            },
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
