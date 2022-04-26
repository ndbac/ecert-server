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
import { CommentService } from '../providers/comment.service';
import { CreateCommentDto, UpdateCommentBodyDto } from '../dto/comment.dto';
import { CommentResponseDto } from '../dto/comment-response.dto';

@Controller('user/comment')
@ApiTags('user.comment')
@UsePipes(ValidationPipe)
export class CommentController {
  constructor(private readonly commentSrv: CommentService) {}

  @ApiOperation({
    operationId: 'createComment',
    summary: 'user create a comment',
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'comment created successfully',
    type: CommentResponseDto,
  })
  @ApiBody({ type: CreateCommentDto })
  @SecurityDecorator()
  @Post('')
  async createComment(
    @User('') userData: TokenDetailsDto,
    @Body() commentData: CreateCommentDto,
  ) {
    return await this.commentSrv.createComment(userData, commentData);
  }

  @ApiOperation({
    operationId: 'updateComment',
    summary: 'user update a comment',
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'comment updated successfully',
    type: CommentResponseDto,
  })
  @ApiBody({ type: UpdateCommentBodyDto })
  @ApiParam({ name: 'commentId' })
  @SecurityDecorator()
  @Put('/:commentId')
  async updateComment(
    @User('') userData: TokenDetailsDto,
    @Param('commentId') commentId: string,
    @Body() commentData: UpdateCommentBodyDto,
  ) {
    return await this.commentSrv.updateComment(userData, {
      ...commentData,
      commentId,
    });
  }

  @ApiOperation({
    operationId: 'deleteComment',
    summary: 'user delete a comment',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'comment deleted successfully',
    type: CommentResponseDto,
  })
  @ApiParam({ name: 'commentId' })
  @SecurityDecorator()
  @Delete('/delete/:commentId')
  async deleteComment(
    @User('') userData: TokenDetailsDto,
    @Param('commentId') commentId: string,
  ) {
    return await this.commentSrv.deleteComment(userData, commentId);
  }
}
