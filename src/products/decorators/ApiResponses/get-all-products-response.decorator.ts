import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export const ApiGetAllProductsResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Retrieve all products' }),
    ApiResponse({
      status: 200,
      description: 'Products retrieved successfully.',
      schema: {
        example: {
          statusCode: 200,
          message: 'Products retrieved successfully.',
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
                  url: 'http://localhost:3000/media/fe4139f2-10fc-4bf3-af3f-12345d800d08.jpeg',
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
