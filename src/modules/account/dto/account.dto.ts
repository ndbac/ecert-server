import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { IamPhotoType } from 'src/shared/types';

export class UploadPhotoDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  width: string;

  @ApiProperty({ enum: IamPhotoType })
  @IsNotEmpty()
  @IsEnum(IamPhotoType)
  extension: IamPhotoType;
}
