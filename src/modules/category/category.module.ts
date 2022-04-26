import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { CategoryCoreModule } from './category.core.module';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { AuthCoreModule } from '../auth/auth.core.module';
import { CategoryService } from './providers/category.service';
import { CategoryController } from './controllers/category.controller';

@Module({
  imports: [CategoryCoreModule, CommonModule, AuthCoreModule],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(CategoryController);
  }
}
