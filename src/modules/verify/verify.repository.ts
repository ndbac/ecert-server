import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/shared/mongoose/base.repository';
import { CollectionName } from 'src/shared/types';
import { VerifyDocument } from './verify.model';

@Injectable()
export class VerifyRepository
  extends BaseRepository<VerifyDocument>
  implements OnApplicationBootstrap
{
  constructor(
    @InjectModel(CollectionName.VERIFICATION)
    model: Model<VerifyDocument>,
  ) {
    super(model);
  }

  async onApplicationBootstrap() {
    await this.createCollection();
  }
}
