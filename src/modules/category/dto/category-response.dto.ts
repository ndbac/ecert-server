import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseResponseDto } from 'src/shared/base.dto';

export class CategoryResponseDto extends BaseResponseDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  photoUrl: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  postCount: string;
}
