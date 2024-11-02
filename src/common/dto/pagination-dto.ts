import { Type } from 'class-transformer';
import { IsArray, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsArray()
  status?: string[];
}
