import {
  Controller,
  Get,
  Query,
  Param,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger/dist/decorators';
import { CategoryResponseDto } from '../dto/category-response.dto';
import { CategoryUserService } from '../providers/category-user.service';
import { SearchCategoryDto } from '../dto/category-user.dto';

@Controller('user/category')
@ApiTags('user.category')
@UsePipes(ValidationPipe)
export class CategoryUserController {
  constructor(private readonly categoryUserSvc: CategoryUserService) {}

  @ApiOperation({
    operationId: 'readAllCategories',
    summary: 'user read all categories with filters',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'list of categories',
    type: CategoryResponseDto,
  })
  @Get('')
  async readAllCategories(@Query() query: SearchCategoryDto) {
    return await this.categoryUserSvc.readAllCategories(query);
  }

  @ApiOperation({
    operationId: 'readCategoryById',
    summary: 'user read a category by id',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'category',
    type: CategoryResponseDto,
  })
  @ApiParam({ name: 'categoryId' })
  @Get('/:categoryId')
  async readCategoryById(@Param('categoryId') categoryId: string) {
    return await this.categoryUserSvc.readCategoryById(categoryId);
  }
}
