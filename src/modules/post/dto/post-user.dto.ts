import { ApiPropertyOptional } from '@nestjs/swagger/dist/decorators';
import { IsString, IsOptional } from 'class-validator';

export class SearchPostDto {
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

  @ApiPropertyOptional({ description: 'category of post' })
  @IsOptional()
  @IsString()
  categoryId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  userId: string;
}
