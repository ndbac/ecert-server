import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  parentId: string;
}

export class UpdateCommentBodyDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  text: string;
}

export class UpdateCommentDto extends UpdateCommentBodyDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  commentId: string;
}

export class SearchCommentDto {
  @ApiPropertyOptional({ description: 'if true then sort by created time' })
  @IsOptional()
  @IsString()
  sort: boolean;

  @ApiPropertyOptional({ description: 'number of page' })
  @IsOptional()
  @IsString()
  page: string;

  @ApiPropertyOptional({ description: 'post limit per page' })
  @IsOptional()
  @IsString()
  limit: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  parentId: string;
}
