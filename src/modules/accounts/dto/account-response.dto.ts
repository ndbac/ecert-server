import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAccountDto } from './account.dto';

export class AccountResponseDto extends CreateAccountDto {}

export class AccountLoginResponseDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  token: string;
}
