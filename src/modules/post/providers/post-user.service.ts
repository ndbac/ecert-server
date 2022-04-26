import { Injectable } from '@nestjs/common';
import { PostRepository } from '../post.repository';
import { SearchPostDto } from '../dto/post-user.dto';
import { buildRegexSearchOptions } from 'src/shared/search.helpers';

@Injectable()
export class PostUserService {
  constructor(private readonly postRepo: PostRepository) {}

  async readAllPosts(query: SearchPostDto) {
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
    const searchOptions = buildRegexSearchOptions(query.searchText, 'title');
    const searchCdt = {} as any;
    if (query.userId !== undefined && query.userId !== null) {
      searchCdt.userId = query.userId;
    }
    if (query.categoryId !== undefined && query.categoryId !== null) {
      searchCdt.categoryId = query.categoryId;
    }
    return await this.postRepo.find(
      {
        ...searchCdt,
        ...searchOptions,
      },
      { limit, skip, sort },
    );
  }

  async readPostById(postId: string) {
    await this.postRepo.findByIdOrFail(postId);
    return await this.postRepo.updateById(postId, { $inc: { viewCount: 1 } });
  }

  async readRandomPosts(input: string) {
    const size = parseInt(input);
    return await this.postRepo.aggregate([{ $sample: { size } }]);
  }
}
