import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { VerifyCoreModule } from './verify.core.module';
import { VerifyService } from './providers/verify.service';
import { VerifyController } from './controllers/verify.controller';
import { AuthCoreModule } from '../auth/auth.core.module';
import { NotificationCoreModule } from '../notification/notification.core.module';
import { NotificationService } from '../notification/providers/notification.service';

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
export class VerifyModule {}
