import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { CommentCoreModule } from './comment.core.module';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { AuthCoreModule } from '../auth/auth.core.module';
import { CommentController } from './controllers/comment.controller';
import { CommentService } from './providers/comment.service';
import { PostCoreModule } from '../post/post.core.module';

@Module({
  imports: [CommentCoreModule, CommonModule, AuthCoreModule, PostCoreModule],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(CommentController);
  }
}
