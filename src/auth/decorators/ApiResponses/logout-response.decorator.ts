import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiLogoutResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Logout a user' }),
    ApiResponse({
      status: 200,
      description: 'Logout successful',
      schema: {
        example: {
          status: 200,
          description: 'Logout successful',
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
    ApiInternalServerErrorResponse({
      description:
        'Internal Server Error: A database or token generation error occurred.',
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
