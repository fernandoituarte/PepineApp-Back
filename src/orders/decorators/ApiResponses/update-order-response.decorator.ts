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

export const ApiUpdateOrderResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update an order' }),
    ApiCookieAuth(),
    ApiResponse({
      status: 200,
      description: 'Order updated successfully',
      schema: {
        example: {
          statusCode: 200,
          message: 'Order updated successfully',
          order: {
            id: '59e848ed-632f-4745-a057-1234029ce62e',
            total_price: 13.99,
            status: 'En cours',
            createdAt: '2024-10-14T17:09:55.105Z',
            user: {
              id: 'cdd6011e-53c8-4545-8c9c-12348c8030bd',
              role: 'admin',
              first_name: 'John',
              last_name: 'Doe',
              email: 'johndoe@example.com',
              phone: '0674539224',
              isActive: true,
              createdAt: '2024-09-09T19:42:32.496Z',
            },
            orderHasProducts: [
              {
                id: 123,
                quantity: 12,
                price_time_order: 13.99,
                vat: 10,
                product: {
                  id: '624c7835-7aff-4f45-a958-1234c6b4f362',
                  name: 'Monstera deliciosa',
                  price: 39.99,
                  stock: 8,
                  media:
                    'http://localhost:3000/media/492c945a-7ada-48fc-a36f-e4e2503a0062.jpg',
                  category: [
                    {
                      value: "Plantes d'intérieur",
                    },
                  ],
                },
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
      description: 'No order found',
      schema: {
        example: {
          statusCode: 404,
          message:
            'User with id 1fc51234-5678-9100-8645-264558ad7710 not found',
          error: 'Bad Request',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Error updating order data.',
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
