import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadProfilePhotoDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  photoPath: string;
}
