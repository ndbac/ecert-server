import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger/dist/decorators';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class AccountLoginDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class CreateAccountDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password must contain uppercase letters and numbers or special characters',
  })
  password: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  active: boolean;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  photoUrl: string;
}

export class UserDataDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}

export class ChangePasswordDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'new password must contain uppercase letters and numbers or special characters',
  })
  newPassword: string;
}
