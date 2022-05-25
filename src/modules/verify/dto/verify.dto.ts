import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyAccountInputDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty({ message: 'invalid token' })
  @IsString({ message: 'invalid token' })
  access_token: string;
}

export class PasswordResetInputDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  email: string;
}

export class PasswordResetDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
