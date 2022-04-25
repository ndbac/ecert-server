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
