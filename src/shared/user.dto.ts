import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { IamNamespace } from './types';

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
  @ApiProperty({ enum: IamNamespace })
  @IsNotEmpty()
  @IsEnum(IamNamespace)
  namespace: IamNamespace;

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
