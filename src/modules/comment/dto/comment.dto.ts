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
