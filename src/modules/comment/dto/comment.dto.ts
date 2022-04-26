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
