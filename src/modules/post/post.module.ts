import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { PostCoreModule } from './post.core.module';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { PostController } from './controllers/post.controller';
import { AuthCoreModule } from '../auth/auth.core.module';
import { PostService } from './providers/post.service';
import { PostUserService } from './providers/post-user.service';
import { PostUserController } from './controllers/post-user.controller';

@Module({
  imports: [PostCoreModule, CommonModule, AuthCoreModule],
  providers: [PostService, PostUserService],
  controllers: [PostController, PostUserController],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(PostController);
  }
}
