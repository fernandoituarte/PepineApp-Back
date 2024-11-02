import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiCreateProductResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new product' }),
    ApiCookieAuth(),
    ApiResponse({
      status: 201,
      description: 'The product has been successfully registered.',
    }),
    ApiBadRequestResponse({
      description:
        'Validation error: Some fields do not meet the requirements.',
      schema: {
        example: {
          message: [
            'name should not be empty',
            'name must be a string',
            'scientific_name should not be empty',
            'scientific_name must be a string',
            'user_id should not be empty',
            'user_id must be a UUID',
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
          message: 'User Jhon Doe need a valid role: [admin]',
          error: 'Forbidden',
        },
      },
    }),
    ApiNotFoundResponse({
      status: 404,
      description: 'User not found',
      schema: {
        example: {
          statusCode: 404,
          message:
            'User with id 1fc51234-5678-9100-8645-264558ad7710 not found',
          error: 'Not Found',
        },
      },
    }),
    ApiConflictResponse({
      description: 'Conflict: Email already exists.',
      schema: {
        example: {
          statusCode: 409,
          message: 'Key (key)=(value) already exists.',
          error: 'Conflict',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Error: Internal Server Error',
      schema: {
        example: {
          statusCode: 500,
          message:
            'User with id 12345678-5678-9100-8645-264558ad7710 not found',
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
