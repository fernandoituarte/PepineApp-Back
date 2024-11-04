import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export const ApiRegisterResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new user' }),
    ApiResponse({
      description: 'The user has been successfully registered.',
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
            'last_name must be shorter than or equal to 50 characters',
            'last_name must be longer than or equal to 2 characters',
            'last_name should not be empty',
            'last_name must be a string',
            'email must be shorter than or equal to 50 characters',
            'email should not be empty',
            'email must be a string',
            'password must be shorter than or equal to 50 characters',
            'password should not be empty',
            'password must be a string',
            'phone should not be empty',
            'phone must be a string',
          ],
          error: 'Bad Request',
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
