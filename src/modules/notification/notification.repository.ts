import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/shared/mongoose/base.repository';
import { CollectionName } from 'src/shared/types';
import { EmailNotifcationLog } from './notification.model';

@Injectable()
export class NotificationRepository
  extends BaseRepository<EmailNotifcationLog>
  implements OnApplicationBootstrap
{
  constructor(
    @InjectModel(CollectionName.NOTIFICATION)
    model: Model<EmailNotifcationLog>,
  ) {
    super(model);
  }

  async onApplicationBootstrap() {
    await this.createCollection();
  }
}
