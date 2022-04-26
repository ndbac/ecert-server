import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { PostCoreModule } from './post.core.module';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { PostController } from './controllers/post.controller';
import { AuthCoreModule } from '../auth/auth.core.module';
import { PostService } from './providers/post.service';
import { PostUserService } from './providers/post-user.service';
import { PostUserController } from './controllers/post-user.controller';
import { CategoryCoreModule } from '../category/category.core.module';
import { CategoryService } from '../category/providers/category.service';

@Module({
  imports: [PostCoreModule, CommonModule, AuthCoreModule, CategoryCoreModule],
  providers: [PostService, PostUserService, CategoryService],
  controllers: [PostController, PostUserController],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(PostController);
  }
}
