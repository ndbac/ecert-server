import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { CategoryCoreModule } from './category.core.module';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { AuthCoreModule } from '../auth/auth.core.module';
import { CategoryService } from './providers/category.service';
import { CategoryController } from './controllers/category.controller';
import { CategoryUserController } from './controllers/category-user.controller';
import { CategoryUserService } from './providers/category-user.service';

@Module({
  imports: [CategoryCoreModule, CommonModule, AuthCoreModule],
  providers: [CategoryService, CategoryUserService],
  controllers: [CategoryController, CategoryUserController],
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(CategoryController);
  }
}
