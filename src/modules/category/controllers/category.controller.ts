import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiParam,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger/dist/decorators';
import { SecurityDecorator } from 'src/decorators/security-input.decorator';
import { User } from 'src/decorators/user.decorator';
import { TokenDetailsDto } from 'src/shared/user.dto';
import { CreateCategoryDto } from '../dto/category.dto';
import { CategoryResponseDto } from '../dto/category-response.dto';
import { CategoryService } from '../providers/category.service';

@Controller('category')
@ApiTags('creator.category')
@UsePipes(ValidationPipe)
export class CategoryController {
  constructor(private readonly categorySvc: CategoryService) {}

  @ApiOperation({
    operationId: 'createCategory',
    summary: 'creator create a category',
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'category created successfully',
    type: CategoryResponseDto,
  })
  @ApiBody({ type: CreateCategoryDto })
  @SecurityDecorator()
  @Post('')
  async createCategory(
    @User('') userData: TokenDetailsDto,
    @Body() categoryData: CreateCategoryDto,
  ) {
    return await this.categorySvc.createCategory(userData, categoryData);
  }

  @ApiOperation({
    operationId: 'updateCategory',
    summary: 'creator update a category',
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'category updated successfully',
    type: CategoryResponseDto,
  })
  @ApiBody({ type: CreateCategoryDto })
  @ApiParam({ name: 'categoryId' })
  @SecurityDecorator()
  @Put('/:categoryId')
  async updateCategory(
    @User('') userData: TokenDetailsDto,
    @Body() categoryData: CreateCategoryDto,
    @Param('categoryId') categoryId: string,
  ) {
    return await this.categorySvc.updateCategory(userData, {
      ...categoryData,
      categoryId,
    });
  }
}
