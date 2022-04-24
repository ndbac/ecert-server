import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: Array })
  @IsNotEmpty()
  @IsArray()
  photoUrl: string[];

  @ApiProperty({ type: Array })
  @IsNotEmpty()
  @IsArray()
  categoriesId: string[];
}
