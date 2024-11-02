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
      status: 201,
      description: 'Login successful',
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
