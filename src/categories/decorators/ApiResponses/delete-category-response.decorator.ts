import { applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiDeleteCategoryResponse = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete a category',
      description: 'Allows an admin to delete a category by ID.',
    }),
    ApiCookieAuth(),
    ApiResponse({
      status: 200,
      description: 'Category with id (id) has been deleted',
      schema: {
        example: {
          statusCode: 200,
          message: 'Category with id (id) has been deleted',
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
      description: 'Category with id (id)} not found',
      schema: {
        example: {
          statusCode: 404,
          message: 'Category with id (id) not found',
          error: 'Not Found',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal Server Error.',
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
