import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { AuthController } from './controllers/auth.controller';
import { AuthCoreModule } from './auth.core.module';
import { AuthService } from './providers/auth.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [AuthCoreModule, CommonModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(AuthController);
  }
}
