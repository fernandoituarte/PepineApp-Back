import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiServiceUnavailableResponse,
} from '@nestjs/swagger';

export const ApiForgotPasswordResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Forgot password' }),
    ApiResponse({
      status: 201,
      description: 'Email envoyé correctement',
    }),
    ApiNotFoundResponse({
      status: 404,
      description: "Aucun utilisateur n'a été trouvé avec cet email.",
      schema: {
        example: {
          statusCode: 404,
          message: "Aucun utilisateur n'a été trouvé avec cet email.",
          error: 'Not Found',
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'Invalid recipient email address.',
      schema: {
        example: {
          statusCode: 400,
          message: 'Invalid recipient email address.',
          error: 'Bad Request',
        },
      },
    }),
    ApiServiceUnavailableResponse({
      description: 'Could not connect to the SMTP server.',
      schema: {
        example: {
          statusCode: 503,
          message: 'Could not connect to the SMTP server.',
          error: 'Service Unavailable',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description:
        'Internal Server Error: An unexpected error occurred while sending the email.',
      schema: {
        example: {
          statusCode: 500,
          message: 'RESET_PASSWORD_URL is not configured.',
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
