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

export const ApiUpdateUserResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update a user' }),
    ApiCookieAuth(),
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
      description: 'No users found',
      schema: {
        example: {
          statusCode: 404,
          message:
            'User with id 1fc51234-5678-9100-8645-264558ad7710 not found',
          error: 'Bad Request',
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
