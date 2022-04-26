import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString } from 'class-validator';
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

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  parentId: string;
}
