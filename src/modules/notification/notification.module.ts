import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { NotificationCoreModule } from './notification.core.module';
import { NotificationService } from './providers/notification.service';
import { NotificationController } from './controllers/notification.controller';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { AuthCoreModule } from '../auth/auth.core.module';

@Module({
  imports: [NotificationCoreModule, CommonModule, AuthCoreModule],
  providers: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(NotificationController);
  }
}
