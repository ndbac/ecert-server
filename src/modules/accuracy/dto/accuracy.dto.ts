import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { BaseResponseDto } from 'src/shared/base.dto';

export class AccuracyInputDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  data: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  subject: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class AccuracyResDto extends BaseResponseDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  data: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  subject: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  qrCode: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  signature: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
