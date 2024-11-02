import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiUpdatePasswordResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update password' }),
    ApiCookieAuth(),
    ApiResponse({
      status: 201,
      description: 'Mot de passe mise a jour',
    }),
    ApiNotFoundResponse({
      status: 404,
      description: 'User with id (id) not found',
      schema: {
        example: {
          statusCode: 404,
          message: 'User with id (id) not found',
          error: 'Not Found Request',
        },
      },
    }),
    ApiBadRequestResponse({
      description: `Les informations d'identification ne sont pas valides (e-mail ou mot de passe)`,
      schema: {
        example: {
          statusCode: 400,
          message: `Les informations d'identification ne sont pas valides (e-mail ou mot de passe)`,
          error: 'Bad Request',
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
      description: 'Error updating user data.',
      schema: {
        example: {
          statusCode: 500,
          message: 'Error updating user data.',
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
