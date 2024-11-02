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

export const ApiCreateOrderResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new order' }),
    ApiCookieAuth(),
    ApiResponse({
      status: 201,
      description: 'Order created successfuly.',
      schema: {
        example: {
          statusCode: 201,
          message: 'Order created successfuly.',
          orderId: 'adcb26bf-1234-5678-a263-5f4022b1bc78',
        },
      },
    }),
    ApiBadRequestResponse({
      description: `Error: Bad Request`,
      schema: {
        example: {
          message: [
            'property total_prie should not exist',
            'total_price must be a positive number',
            'total_price must be a number conforming to the specified constraints',
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
      description: 'User with id (id)} not found',
      schema: {
        example: {
          statusCode: 404,
          message:
            'User with id 1fc51234-5678-9100-8645-264558ad7710 not found',
          error: 'Not Found',
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
