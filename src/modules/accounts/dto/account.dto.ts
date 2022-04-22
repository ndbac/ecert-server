import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

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

export class CreateAccountDto extends AccountLoginDto {
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
}

export class AccountResponseDto extends CreateAccountDto {}