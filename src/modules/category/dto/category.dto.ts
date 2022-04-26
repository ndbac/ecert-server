import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateCategoryDto extends CreateCategoryDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
