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
import { PostService } from '../providers/post.service';
import { SecurityDecorator } from 'src/decorators/security-input.decorator';
import { User } from 'src/decorators/user.decorator';
import { TokenDetailsDto } from 'src/shared/user.dto';
import { CreatePostDto } from '../dto/post.dto';
import { PostResponseDto } from '../dto/post-response.dto';

@Controller('post')
@ApiTags('post')
@UsePipes(ValidationPipe)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({
    operationId: 'createPost',
    summary: 'create a post',
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'post created successfully',
    type: PostResponseDto,
  })
  @ApiBody({ type: CreatePostDto })
  @SecurityDecorator()
  @Post('')
  async createPost(
    @User('') userData: TokenDetailsDto,
    @Body() postData: CreatePostDto,
  ) {
    return await this.postService.createPost(userData, postData);
  }
}
