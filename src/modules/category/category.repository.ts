import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/shared/mongoose/base.repository';
import { CollectionName } from 'src/shared/types';
import { CategoryDocument } from './category.model';

@Injectable()
export class CategoryRepository
  extends BaseRepository<CategoryDocument>
  implements OnApplicationBootstrap
{
  constructor(
    @InjectModel(CollectionName.CATEGORY)
    model: Model<CategoryDocument>,
  ) {
    super(model);
  }

  async onApplicationBootstrap() {
    await this.createCollection();
  }
}
