import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { CreateAccountDto } from './auth.dto';

export class AccountResponseDto extends CreateAccountDto {}

export class AccountLoginResponseDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  access_token: string;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  @IsDate()
  expires_in: Date;
}
