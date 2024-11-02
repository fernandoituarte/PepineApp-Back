import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiCreateCategoryResponse = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new category',
      description: 'Allows an admin to create a new category.',
    }),
    ApiCookieAuth(),
    ApiResponse({
      status: 201,
      description: 'Category created successfully.',
      schema: {
        example: {
          message: [
            'property value2 should not exist',
            'property description2 should not exist',
            'property media2 should not exist',
            'value should not be empty',
            'value must be shorter than or equal to 50 characters',
            'value must be longer than or equal to 2 characters',
            'value must be a string',
          ],
          error: 'Category created successfully.',
          statusCode: 201,
        },
      },
    }),
    ApiBadRequestResponse({
      description:
        'Validation error: Some fields do not meet the requirements.',
      schema: {
        example: {
          message: [
            'property value2 should not exist',
            'property description2 should not exist',
            'property media2 should not exist',
            'value should not be empty',
            'value must be shorter than or equal to 50 characters',
            'value must be longer than or equal to 2 characters',
            'value must be a string',
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
    ApiConflictResponse({
      description: 'Conflict: Value already exists.',
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
          message: 'Check server logs',
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
