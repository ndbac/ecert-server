import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { NotificationCoreModule } from './notification.core.module';
import { NotificationService } from './providers/notification.service';
import { NotificationController } from './controllers/notification.controller';

@Module({
  imports: [NotificationCoreModule, CommonModule],
  providers: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
