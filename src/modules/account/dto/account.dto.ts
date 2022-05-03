import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UploadPhotoResponseDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  userId: string;
}

export class SoftUpdateAccountDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  bio?: string;
}
