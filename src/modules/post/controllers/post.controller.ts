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
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger/dist/decorators';
import { PostService } from '../providers/post.service';
import { SecurityDecorator } from 'src/decorators/security-input.decorator';
import { User } from 'src/decorators/user.decorator';
import { TokenDetailsDto } from 'src/shared/user.dto';
import { CreatePostDto, DeletePostsDto } from '../dto/post.dto';
import { PostResponseDto, DeletePostsResDto } from '../dto/post-response.dto';

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

  @ApiOperation({
    operationId: 'updatePost',
    summary: 'update a post',
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'post updated successfully',
    type: PostResponseDto,
  })
  @ApiBody({ type: CreatePostDto })
  @SecurityDecorator()
  @Put('/:postId')
  async updatePost(
    @User('') userData: TokenDetailsDto,
    @Body() postData: CreatePostDto,
    @Param('postId') postId: string,
  ) {
    return await this.postService.updatePost(userData, { ...postData, postId });
  }

  @ApiOperation({
    operationId: 'deletePosts',
    summary: 'delete posts',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'posts deleted successfully',
    type: DeletePostsResDto,
  })
  @ApiBody({ type: DeletePostsDto })
  @SecurityDecorator()
  @Delete('')
  async deletePosts(
    @User('') userData: TokenDetailsDto,
    @Body() postList: DeletePostsDto,
  ) {
    return await this.postService.deletePosts(userData, postList);
  }
}
