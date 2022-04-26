import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CommentRepository } from '../comment.repository';
import { CreateCommentDto, UpdateCommentDto } from '../dto/comment.dto';
import { TokenDetailsDto } from 'src/shared/user.dto';
import { PostRepository } from '../../post/post.repository';
import { IamNamespace } from 'src/shared/types';

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

  async updateComment(
    tokenDetails: TokenDetailsDto,
    commentData: UpdateCommentDto,
  ) {
    const comment = await this.commentRepo.findByIdOrFail(
      commentData.commentId,
    );
    if (
      comment.userId !== tokenDetails.user.userId &&
      tokenDetails.user.namespace !== IamNamespace.ADMIN
    ) {
      throw new ForbiddenException('permission is required');
    }
    return await this.commentRepo.updateById(commentData.commentId, {
      text: commentData.text,
    });
  }

  async deleteComment(tokenDetails: TokenDetailsDto, commentId: string) {
    const comment = await this.commentRepo.findByIdOrFail(commentId);
    if (
      comment.userId !== tokenDetails.user.userId &&
      tokenDetails.user.namespace !== IamNamespace.ADMIN
    ) {
      throw new ForbiddenException('permission is required');
    }
    await this.commentRepo.deleteById(commentId);
    return { status: 'comment deleted', commentId };
  }
}
