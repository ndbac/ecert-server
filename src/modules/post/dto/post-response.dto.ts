import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
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

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  categoryId?: string;
}

export class DeletePostsResDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ type: Array })
  @IsNotEmpty()
  @IsArray()
  deletedList: string[];
}
