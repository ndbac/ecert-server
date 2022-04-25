import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString } from 'class-validator';

export class BaseResponseDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  _id: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  createdAt: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  updatedAt: string;
}
