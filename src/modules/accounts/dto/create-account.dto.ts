import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger/dist/decorators';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsBoolean, IsEmail } from 'class-validator';
import { EAccountType } from 'src/shared/types';

export class CreateAccountDto {
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

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ enum: EAccountType, type: String })
    @IsNotEmpty()
    @IsEnum(EAccountType)
    type: EAccountType;

    @ApiPropertyOptional({ type: Boolean })
    @IsOptional()
    @IsBoolean()
    active: boolean;
}
