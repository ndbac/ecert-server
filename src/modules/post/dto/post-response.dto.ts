import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger/dist/decorators';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { BaseResponseDto } from 'src/shared/base.dto';

export class PostResponseDto extends BaseResponseDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  slug: string;

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

export class DeletePostsResDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  deletedPostQuantity: number;

  @ApiProperty({ type: Array })
  @IsNotEmpty()
  @IsArray()
  deletedList: string[];
}
