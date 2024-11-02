import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export const ApiResetPasswordResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Reset password' }),
    ApiResponse({
      status: 200,
      description: 'User updated successfully',
      schema: {
        example: {
          statusCode: 200,
          message: 'User updated successfully',
          user: [
            'id: 1fc52790-b25f-4470-8645-123456789010',
            'first_name: Jhon',
            'last_name: Doe',
            'email: john@doe.com',
            'role: user',
            'isActive: true',
            'phone: +123456733890',
            'createdAt: 2024-09-16T16:56:52.970Z',
          ],
        },
      },
    }),
    ApiNotFoundResponse({
      status: 404,
      description: 'User with id (id) not found',
      schema: {
        example: {
          statusCode: 404,
          message: 'User with id (id) not found',
          error: 'Bad Request',
        },
      },
    }),
    ApiBadRequestResponse({
      description: `Le lien a expiré ou il n'est pas valable`,
      schema: {
        example: {
          statusCode: 400,
          message: `Le lien a expiré ou il n'est pas valable`,
          error: 'Bad Request',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Error updating user data.',
      schema: {
        example: {
          statusCode: 500,
          message: 'Error updating user data.',
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
