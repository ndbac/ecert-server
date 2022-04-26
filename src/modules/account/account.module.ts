import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { AuthCoreModule } from '../auth/auth.core.module';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './providers/account.service';

@Module({
  imports: [CommonModule, AuthCoreModule],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(AccountController);
  }
}
