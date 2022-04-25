import {
  Controller,
  Get,
  Query,
  Param,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger/dist/decorators';
import { PostUserService } from '../providers/post-user.service';
import { SearchPostDto } from '../dto/post-user.dto';
import { PostResponseDto } from '../dto/post-response.dto';

@Controller('user/post')
@ApiTags('user.post')
@UsePipes(ValidationPipe)
export class PostUserController {
  constructor(private readonly postUserSvc: PostUserService) {}

  @ApiOperation({
    operationId: 'searchPosts',
    summary: 'user read all posts with filters',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'list of posts',
    type: PostResponseDto,
  })
  @Get('')
  async searchPosts(@Query() query: SearchPostDto) {
    return await this.postUserSvc.readAllPosts(query);
  }

  @ApiOperation({
    operationId: 'readAPostById',
    summary: 'user read a post by id',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'post',
    type: PostResponseDto,
  })
  @ApiParam({ name: 'postId' })
  @Get('/:postId')
  async readPostById(@Param('postId') postId: string) {
    return await this.postUserSvc.readPostById(postId);
  }
}
