import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { BaseResponseDto } from 'src/shared/base.dto';

export class CommentResponseDto extends BaseResponseDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  parentId: string;
}
