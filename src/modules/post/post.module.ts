import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { PostCoreModule } from './post.core.module';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { PostController } from './controllers/post.controller';
import { AuthCoreModule } from '../auth/auth.core.module';
import { PostService } from './providers/post.service';

@Module({
  imports: [PostCoreModule, CommonModule, AuthCoreModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(PostController);
  }
}
