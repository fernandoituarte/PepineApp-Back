import { applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export const ApiSeedResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Execute database seed operation' }),
    ApiCookieAuth(),
    ApiResponse({
      status: 201,
      description: 'Seed executed',
    }),

    ApiInternalServerErrorResponse({
      description: 'Error: Internal Server Error',
      schema: {
        example: {
          statusCode: 500,
          message: 'Seed failed, all changes have been reverted',
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
