import { Injectable, BadRequestException } from '@nestjs/common';
import { CommentRepository } from '../comment.repository';
import { CreateCommentDto } from '../dto/comment.dto';
import { TokenDetailsDto } from 'src/shared/user.dto';
import { PostRepository } from '../../post/post.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepo: CommentRepository,
    private readonly postRepo: PostRepository,
  ) {}

  async createComment(
    tokenDetails: TokenDetailsDto,
    commentData: CreateCommentDto,
  ) {
    const post = await this.postRepo.findById(commentData.parentId);
    const comment = await this.commentRepo.findById(commentData.parentId);
    if (
      (post === undefined || post === null) &&
      (comment === undefined || comment === null)
    ) {
      throw new BadRequestException('invalid parentId');
    }
    const {
      user: { userId },
    } = tokenDetails;
    return await this.commentRepo.create({ ...commentData, userId });
  }
}
