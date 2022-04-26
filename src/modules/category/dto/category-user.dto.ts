import { ApiPropertyOptional } from '@nestjs/swagger/dist/decorators';
import { IsString, IsOptional } from 'class-validator';

export class SearchCategoryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  searchText: string;

  @ApiPropertyOptional({ description: 'number of page' })
  @IsOptional()
  @IsString()
  page: string;

  @ApiPropertyOptional({ description: 'post limit per page' })
  @IsOptional()
  @IsString()
  limit: string;

  @ApiPropertyOptional({ description: 'if true then sort by created time' })
  @IsOptional()
  @IsString()
  sort: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  userId: string;
}
