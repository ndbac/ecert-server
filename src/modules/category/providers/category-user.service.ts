import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../category.repository';
import { SearchCategoryDto } from '../dto/category-user.dto';
import { buildRegexSearchOptions } from 'src/shared/search.helpers';

@Injectable()
export class CategoryUserService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async readAllCategories(query: SearchCategoryDto) {
    const page = parseInt(query.page) || 1;
    const limit =
      parseInt(query.limit) || parseInt(process.env.DEFAULT_PAGE_SIZE);
    const skip = (page - 1) * limit;
    let sort: object;
    if (query.sort && query.sort.toString() === 'true') {
      sort = { createdAt: 1 };
    } else {
      sort = { createdAt: -1 };
    }
    const searchOptions = buildRegexSearchOptions(query.searchText, 'name');
    const searchCdt = {} as any;
    if (query.userId !== undefined && query.userId !== null) {
      searchCdt.userId = query.userId;
    }
    return await this.categoryRepo.find(
      {
        ...searchCdt,
        ...searchOptions,
      },
      { limit, skip, sort },
    );
  }

  async readCategoryById(categoryId: string) {
    return await this.categoryRepo.findByIdOrFail(categoryId);
  }
}
