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

export const ApiDeleteMediaResponse = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete a media file',
      description: 'Allows an admin to delete a media file by its name.',
    }),
    ApiCookieAuth(),
    ApiResponse({
      status: 200,
      description: 'Media with id (id) has been deleted',
      schema: {
        example: {
          statusCode: 200,
          message: 'Media with id (id) has been deleted',
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
      description: 'Media with id (id)} not found',
      schema: {
        example: {
          statusCode: 404,
          message:
            'Media with id 1fc51234-5678-9100-8645-264558ad7710 not found',
          error: 'Bad Request',
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
