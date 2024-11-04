import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiLoginResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Login a user' }),
    ApiResponse({
      description: 'Login successful',
      schema: {
        example: {
          status: 201,
          description: 'The user has been successfully registered.',
          user: { role: 'user', id: 'c62e05b0-37ff-4e9e-8b56-e4b482a71234' },
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAZXhhbXBsZS5jb20iLCJyb2xlIjoiZXhhbXBsZSIsImlkIjoiYzYyZTA1YjAtMzdmZi00ZTllLThiNTYtZTRiNDgyYTcxMjM0IiwiaWF0IjoxNzMwNzI5NjA0LCJleHAiOjE3MzA4MTYwMDR9.PFunHE9KTCYpYXvjsoZFI31RlfaKxSBGmNWUCqc4yI0',
        },
      },
    }),
    ApiBadRequestResponse({
      description:
        'Validation error: Some fields do not meet the requirements.',
      schema: {
        example: {
          statusCode: 400,
          message: [
            'The password must have a Uppercase, lowercase letter and a number',
            'password must be shorter than or equal to 50 characters',
            'password must be longer than or equal to 6 characters',
            'password must be a string',
          ],
          error: 'Bad Request',
        },
      },
    }),
    ApiUnauthorizedResponse({
      description:
        'Unauthorized: The provided email or password is incorrect, or the user does not have the necessary permissions.',
      schema: {
        example: {
          statusCode: 401,
          message: `Les informations d'identification ne sont pas valides (key)`,
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
