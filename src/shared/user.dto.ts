import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class TokenDataDto {
  @ApiProperty({ type: Date })
  @IsNotEmpty()
  @IsDate()
  tokenIssue: Date;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  @IsDate()
  tokenExpires: Date;
}

export class UserDataDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  namespace: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  email: string;
}

export class TokenDetailsDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => UserDataDto)
  user: UserDataDto;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => TokenDataDto)
  token: TokenDataDto;
}
