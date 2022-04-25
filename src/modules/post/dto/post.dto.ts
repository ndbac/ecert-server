import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: Array })
  @IsNotEmpty()
  @IsArray()
  photoUrl: string[];

  @ApiPropertyOptional({ type: Array })
  @IsOptional()
  @IsArray()
  categoriesId?: string[];
}

export class UpdatePostDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  postId: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ type: Array })
  @IsOptional()
  @IsArray()
  photoUrl?: string[];

  @ApiPropertyOptional({ type: Array })
  @IsOptional()
  @IsArray()
  categoriesId?: string[];
}

export class DeletePostsDto {
  @ApiProperty({ type: Array })
  @IsNotEmpty()
  @IsArray()
  postList: string[];
}
