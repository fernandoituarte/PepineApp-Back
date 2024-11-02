import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiCreateMediaResponse = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Upload media files',
      description:
        'Allows an admin to upload one or more image files to the server.',
    }),
    ApiCookieAuth(),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Media created successfully.',
      schema: {
        example: {
          message: 'Media created successfully.',
          secureUrls: [
            'http://localhost:3000/api/media/1d75081c-0ce2-4063-af0e-cba474763e19.jpeg',
            'http://localhost:3000/api/media/1d75081c-0ce2-4063-af0e-cba474763e19.jpeg',
          ],
          statusCode: 201,
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'Validation error: Make sure that the file is an image',
      schema: {
        example: {
          message: 'Make sure that the file is an image',
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
