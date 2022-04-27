import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/shared/mongoose/base.repository';
import { CollectionName } from 'src/shared/types';
import { AccuracyDocument } from './accuracy.model';

@Injectable()
export class AccuracyRepository
  extends BaseRepository<AccuracyDocument>
  implements OnApplicationBootstrap
{
  constructor(
    @InjectModel(CollectionName.ACCURACY)
    model: Model<AccuracyDocument>,
  ) {
    super(model);
  }

  async onApplicationBootstrap() {
    await this.createCollection();
  }
}
