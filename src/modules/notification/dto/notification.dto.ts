import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { EEmailOption } from '../../util/types';
import { ENotificationType } from '../types';

export class SendEmailInputDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  from: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  to: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  subject: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  html?: string;

  @ApiProperty({ enum: EEmailOption })
  @IsNotEmpty()
  @IsEnum(EEmailOption)
  option: EEmailOption;

  @ApiProperty({ enum: ENotificationType })
  @IsNotEmpty()
  @IsEnum(ENotificationType)
  type: ENotificationType;
}
