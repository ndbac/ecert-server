import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger/dist/decorators';
import { SecurityDecorator } from 'src/decorators/security-input.decorator';
import { User } from 'src/decorators/user.decorator';
import { TokenDetailsDto } from 'src/shared/user.dto';
import { CommentService } from '../providers/comment.service';
import { CreateCommentDto } from '../dto/comment.dto';
import { CommentResponseDto } from '../dto/comment-response.dto';

@Controller('user/comment')
@ApiTags('user.comment')
@UsePipes(ValidationPipe)
export class CommentController {
  constructor(private readonly commentSrv: CommentService) {}

  @ApiOperation({
    operationId: 'createCategory',
    summary: 'creator create a category',
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'category created successfully',
    type: CommentResponseDto,
  })
  @ApiBody({ type: CreateCommentDto })
  @SecurityDecorator()
  @Post('')
  async createCategory(
    @User('') userData: TokenDetailsDto,
    @Body() commentData: CreateCommentDto,
  ) {
    return await this.commentSrv.createComment(userData, commentData);
  }
}
