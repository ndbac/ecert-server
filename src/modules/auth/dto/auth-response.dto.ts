import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAccountDto } from './auth.dto';

export class AccountResponseDto extends CreateAccountDto {}

export class AccountLoginResponseDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  access_token: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  expires_in: string;
}
