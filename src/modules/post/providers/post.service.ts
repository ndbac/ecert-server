import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PostRepository } from '../post.repository';
import { TokenDetailsDto } from 'src/shared/user.dto';
import { CreatePostDto, UpdatePostDto, DeletePostsDto } from '../dto/post.dto';
import { IamNamespace } from 'src/shared/types';
import { makeSlug } from 'src/shared/helpers';
import { CategoryService } from '../../category/providers/category.service';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepo: PostRepository,
    private readonly categorySrv: CategoryService,
  ) {}

  async createPost(tokenData: TokenDetailsDto, postData: CreatePostDto) {
    const slug = makeSlug(postData.title);
    const post = {
      userId: tokenData.user.userId,
      title: postData.title,
      description: postData.description,
      photoUrl: postData.photoUrl,
      categoryId: postData.categoryId,
      slug,
    };
    const data = await this.postRepo.create(post);
    await this.categorySrv.incCategoryPostCnt(postData.categoryId);
    return data;
  }

  async updatePost(tokenData: TokenDetailsDto, postData: UpdatePostDto) {
    const post = await this.postRepo.findByIdOrFail(postData.postId);
    if (
      post.userId !== tokenData.user.userId &&
      tokenData.user.namespace !== IamNamespace.ADMIN
    ) {
      throw new ForbiddenException('token cannot access this route');
    }
    const newSlug = makeSlug(postData.title);
    return await this.postRepo.updateById(postData.postId, {
      ...postData,
      slug: newSlug,
    });
  }

  async deletePosts(tokenData: TokenDetailsDto, input: DeletePostsDto) {
    const checkingValidID = input.postIdList.map(async (e) => {
      const post = await this.postRepo.findById(e);
      if (post === null || post === undefined) {
        throw new BadRequestException(`postId: ${e} is not valid`);
      }
      if (
        post.userId !== tokenData.user.userId &&
        tokenData.user.namespace !== IamNamespace.ADMIN
      ) {
        throw new ForbiddenException(
          `do not have permission to delete post with id ${e}`,
        );
      }
    });
    await Promise.all(checkingValidID);

    const promises = input.postIdList.map(async (e) => {
      const deletedPost = await this.postRepo.deleteById(e);
      await this.categorySrv.decCategoryPostCnt(deletedPost.categoryId);
    });
    await Promise.all(promises);
    return {
      status: 'deleted successfully',
      deletedList: input.postIdList,
    };
  }
}
