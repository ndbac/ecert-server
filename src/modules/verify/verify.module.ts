import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { VerifyCoreModule } from './verify.core.module';
import { VerifyService } from './providers/verify.service';
import { VerifyController } from './controllers/verify.controller';
import { AuthCoreModule } from '../auth/auth.core.module';
import { NotificationCoreModule } from '../notification/notification.core.module';
import { NotificationService } from '../notification/providers/notification.service';
import { UserMiddleware } from 'src/middlewares/user.middleware';

@Module({
  imports: [
    VerifyCoreModule,
    CommonModule,
    AuthCoreModule,
    NotificationCoreModule,
  ],
  providers: [VerifyService, NotificationService],
  controllers: [VerifyController],
})
export class VerifyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .exclude({
        path: 'verify/createResetPasswordToken',
        method: RequestMethod.PUT,
      })
      .forRoutes(VerifyController);
  }
}
