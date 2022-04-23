import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionName } from 'src/shared/types';
import { EmailNotifcationLog } from './notification.model';
import { NotificationRepository } from './notification.repository';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CollectionName.NOTIFICATION,
        schema: EmailNotifcationLog.schema,
      },
    ]),
  ],
  providers: [NotificationRepository],
  exports: [NotificationRepository],
})
export class NotificationCoreModule {}
