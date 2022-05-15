import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseGuards,
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
import { CreateCategoryDto, UpdateCategoryBodyDto } from '../dto/category.dto';
import { CategoryResponseDto } from '../dto/category-response.dto';
import { CategoryService } from '../providers/category.service';
import { AuthEndpoint } from 'src/decorators/auth-endpoint.decorator';
import { IamNamespace } from 'src/shared/types';
import { ProjectorAccessGuard } from 'src/guards/resources/projector-access.guard';

@Controller('creator/category')
@ApiTags('creator.category')
@UseGuards(ProjectorAccessGuard)
@UsePipes(ValidationPipe)
export class CategoryController {
  constructor(private readonly categorySvc: CategoryService) {}

  @ApiOperation({
    operationId: 'createCategory',
    summary: 'creator create a category',
  })
  @AuthEndpoint({ namespaces: [IamNamespace.ADMIN, IamNamespace.PROJECT] })
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
  @AuthEndpoint({ namespaces: [IamNamespace.ADMIN, IamNamespace.PROJECT] })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'category updated successfully',
    type: CategoryResponseDto,
  })
  @ApiBody({ type: UpdateCategoryBodyDto })
  @ApiParam({ name: 'categoryId' })
  @SecurityDecorator()
  @Put('/:categoryId')
  async updateCategory(
    @User('') userData: TokenDetailsDto,
    @Body() categoryData: UpdateCategoryBodyDto,
    @Param('categoryId') categoryId: string,
  ) {
    return await this.categorySvc.updateCategory(userData, {
      ...categoryData,
      categoryId,
    });
  }

  @ApiOperation({
    operationId: 'deleteCategory',
    summary: 'creator delete a category',
  })
  @AuthEndpoint({ namespaces: [IamNamespace.ADMIN, IamNamespace.PROJECT] })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'category deleted successfully',
  })
  @ApiParam({ name: 'categoryId' })
  @SecurityDecorator()
  @Delete('/:categoryId')
  async deleteCategory(
    @User('') userData: TokenDetailsDto,
    @Param('categoryId') categoryId: string,
  ) {
    return await this.categorySvc.deleteCategory(userData, categoryId);
  }
}
