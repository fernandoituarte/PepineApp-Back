import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiCreateOrderHasProductResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create order-product association' }),
    ApiCookieAuth(),
    ApiResponse({
      status: 201,
      description: 'OrderHasProduct created successfuly.',
      schema: {
        example: {
          statusCode: 201,
          message: 'OrderHasProduct successfuly.',
          orderId: 'adcb26bf-1234-5678-a263-5f4022b1bc78',
        },
      },
    }),
    ApiBadRequestResponse({
      description: `Error: Bad Request`,
      schema: {
        example: {
          message: [
            'product_id must be a string',
            'order_id must be a string',
            'quantity must be a positive number',
            'quantity must be a number conforming to the specified constraints',
            'price_time_order must be a positive number',
            'price_time_order must be a number conforming to the specified constraints',
            'vat must be a positive number',
            'vat must be a number conforming to the specified constraints',
          ],
          error: 'Bad Request',
          statusCode: 400,
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
          message: 'User Jhon Doe need a valid role: [admin, user]',
          error: 'Forbidden',
        },
      },
    }),
    ApiNotFoundResponse({
      status: 404,
      description: 'Product with ID (id) not found',
      schema: {
        example: {
          statusCode: 404,
          message:
            'Product with ID 1fc51234-5678-9100-8645-264558ad7710 not found',
          error: 'Not Found',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Error creating orderHasProduct.',
      schema: {
        example: {
          statusCode: 500,
          message:
            'Product with ID e725e9fe-8078-4c14-afce-5b697b3cd563 not found',
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
