import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export const ApiGetAllProductsByCategoryResponse = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all products for a category',
      description:
        'Fetches a paginated list of all products associated with a category by ID.',
    }),
    ApiResponse({
      status: 200,
      description: 'Products retrieved successfully.',
      schema: {
        example: {
          statusCode: 200,
          message: 'Products retrieved successfully.',
          category: {
            id: 71,
            value: 'Plantes aromatiques',
            description:
              'Les plantes aromatiques sont cultivées pour leurs feuilles parfumées et leurs propriétés culinaires. Elles peuvent être utilisées fraîches ou séchées pour assaisonner une variété de plats.',
            createdAt: '2024-09-09T19:42:31.712Z',
            updatedAt: '2024-09-09T19:42:31.712Z',
            media: {
              id: 311,
              url: 'http://localhost:3000/api/media/f445d64c-e089-4814-8688-4263e0175073.jpg',
              createdAt: '2024-10-15T16:40:23.249Z',
              updatedAt: '2024-10-15T16:40:23.371Z',
            },
          },
          totalPages: 2,
          totalProducts: 38,
          products: [
            {
              id: '8c98f9da-25bc-4194-8f7f-6f327011ddd8',
              name: 'Ficus',
              slug: 'ficus',
              scientific_name: 'Ficus Benjamina',
              maturity_height: '10-15 ft',
              maturity_width: '5-10 ft',
              family: 'Moraceae',
              origin: 'Tropical Asia',
              flower_color: 'White',
              leaf_color: 'Green',
              description1: 'Indoor plant care instructions',
              description2: 'Special handling instructions',
              size: 'Medium',
              pot: 'Plastic Pot',
              stock: 50,
              price: 15.99,
              vat: 20,
              status: true,
              user_id: 'cdd6011e-53c8-4545-8c9c-abde8c8030bd',
              yield: 'High',
              hardiness_zone: '5-9',
              water_requirement: 'Medium',
              exposure: 'Full Sun',
              ground_cover_power: 'Good',
              strate: 'Shrub',
              foliage: 'Evergreen',
              media: [
                {
                  id: 294,
                  url: 'http://localhost:3000/api/media/fe4139f2-10fc-4bf3-af3f-12345d800d08.jpeg',
                },
              ],
              categories: [
                {
                  id: 69,
                  value: 'Plantes médicinales',
                },
                {
                  id: 71,
                  value: 'Plantes aromatiques',
                },
              ],
            },
          ],
        },
      },
    }),
    ApiNotFoundResponse({
      status: 404,
      description: 'No products found',
      schema: {
        example: {
          statusCode: 404,
          message: 'No products found',
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
