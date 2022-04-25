import { Injectable, ForbiddenException } from '@nestjs/common';
import { PostRepository } from '../post.repository';
import { TokenDetailsDto } from 'src/shared/user.dto';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import slugify from 'slugify';
import { CryptoService } from 'src/modules/common/crypto/crypto.service';
import { IamNamespace } from 'src/shared/types';
import { makeSlug } from 'src/shared/helpers';

@Injectable()
export class PostService {
  constructor(private readonly postRepo: PostRepository) {}

  async createPost(tokenData: TokenDetailsDto, postData: CreatePostDto) {
    const slug = makeSlug(postData.title);
    const post = {
      userId: tokenData.user.userId,
      title: postData.title,
      description: postData.description,
      photoUrl: postData.photoUrl,
      categoriesId: postData.categoriesId,
      slug,
    };
    return await this.postRepo.create(post);
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
}
