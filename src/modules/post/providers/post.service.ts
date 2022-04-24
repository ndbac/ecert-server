import { Injectable } from '@nestjs/common';
import { PostRepository } from '../post.repository';
import { TokenDetailsDto } from 'src/shared/user.dto';
import { CreatePostDto } from '../dto/post.dto';
import slugify from 'slugify';
import { CryptoService } from 'src/modules/common/crypto/crypto.service';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepo: PostRepository,
    private readonly cryptoSrv: CryptoService,
  ) {}

  async createPost(tokenData: TokenDetailsDto, postData: CreatePostDto) {
    const slugEnding = await this.cryptoSrv.generateRandomBytes(2);
    const post = {
      userId: tokenData.user.userId,
      title: postData.title,
      description: postData.description,
      photoUrl: postData.photoUrl,
      categoriesId: postData.categoriesId,
      slug: `${slugify(postData.title, { locale: 'vi' })}-${slugEnding}`,
    };
    return await this.postRepo.create(post);
  }
}
