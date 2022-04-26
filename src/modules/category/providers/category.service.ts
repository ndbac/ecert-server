import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CategoryRepository } from '../category.repository';
import { TokenDetailsDto } from 'src/shared/user.dto';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import slugify from 'slugify';
import { IamNamespace } from 'src/shared/types';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async createCategory(
    tokenDetails: TokenDetailsDto,
    input: CreateCategoryDto,
  ) {
    const isExist = await this.categoryRepo.exists({ name: input.name });
    if (isExist) {
      throw new BadRequestException('category already exists');
    }
    const category = {
      name: input.name,
      userId: tokenDetails.user.userId,
      slug: slugify(input.name, { locale: 'vi' }),
      photoUrl: input.photoUrl,
    };
    return await this.categoryRepo.create(category);
  }

  async updateCategory(
    tokenDetails: TokenDetailsDto,
    input: UpdateCategoryDto,
  ) {
    const category = await this.categoryRepo.findByIdOrFail(input.categoryId);
    if (
      category.userId !== tokenDetails.user.userId &&
      tokenDetails.user.namespace !== IamNamespace.ADMIN
    ) {
      throw new ForbiddenException(
        'do not have permission to update this category',
      );
    }
    const newCategory = {
      name: input.name || category.name,
      slug:
        (input.name && slugify(input.name, { locale: 'vi' })) || category.slug,
      photoUrl: input.photoUrl || category.photoUrl,
    };
    return await this.categoryRepo.updateById(input.categoryId, newCategory);
  }
}
