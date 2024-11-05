import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export const ApiGetAllCategoriesResponse = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve all categories',
      description: 'Fetches a paginated list of all categories.',
    }),
    ApiResponse({
      status: 200,
      description: 'Categories retrieved successfully.',
      schema: {
        example: {
          statusCode: 200,
          message: 'Categories retrieved successfully.',
          category: [
            {
              id: 71,
              value: 'Plantes aromatiques',
              description:
                'Les plantes aromatiques sont cultivées pour leurs feuilles parfumées et leurs propriétés culinaires. Elles peuvent être utilisées fraîches ou séchées pour assaisonner une variété de plats.',
              createdAt: '2024-09-09T19:42:31.712Z',
              updatedAt: '2024-09-09T19:42:31.712Z',
              media: {
                id: 311,
                url: 'http://localhost:3000/media/f445d64c-e089-4814-8688-4263e0175073.jpg',
                createdAt: '2024-10-15T16:40:23.249Z',
                updatedAt: '2024-10-15T16:40:23.371Z',
              },
            },
          ],
        },
      },
    }),
    ApiNotFoundResponse({
      status: 404,
      description: 'No Category found',
      schema: {
        example: {
          statusCode: 404,
          message: 'No Category found',
          error: 'Not Found',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal Server Error.',
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
