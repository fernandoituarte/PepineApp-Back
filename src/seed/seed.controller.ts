import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiSeedResponse } from './decorators/seed-response.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  /**
   * Runs the seed process to populate the database with initial data (Admin access only).
   *
   * @returns The result of the seeding operation (success message).
   */
  @Get()
  @ApiSeedResponse()
  executeSeed() {
    return this.seedService.runSeed();
  }
}
