import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString, IsDate, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class AccountResponseDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;
}

export class TokenDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  access_token: string;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  @IsDate()
  expires_in: Date;
}

export class AccountLoginResponseDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => TokenDto)
  token: TokenDto;
}

export class ChangePasswordResponseDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
