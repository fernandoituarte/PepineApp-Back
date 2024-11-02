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

export const ApiDeleteProductResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a product' }),
    ApiCookieAuth(),
    ApiResponse({
      status: 200,
      description: 'Product with id (id) has been deleted',
      schema: {
        example: {
          statusCode: 200,
          message: 'Product with id (id) has been deleted',
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
      description: 'Product with id (id)} not found',
      schema: {
        example: {
          statusCode: 404,
          message:
            'Product with id 1fc51234-5678-9100-8645-264558ad7710 not found',
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
