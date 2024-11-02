import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export const ApiGetMediaResponse = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve a media file',
      description: 'Fetches a media file (image) by its name from the server.',
    }),
    ApiResponse({
      status: 200,
      description: 'Image',
    }),
    ApiNotFoundResponse({
      status: 404,
      description: 'No media found',
      schema: {
        example: {
          statusCode: 404,
          message:
            'Media with id 1fc51234-5678-9100-8645-264558ad7710 not found',
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
