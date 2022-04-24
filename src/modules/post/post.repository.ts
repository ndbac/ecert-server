import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/shared/mongoose/base.repository';
import { CollectionName } from 'src/shared/types';
import { PostDocument } from './post.model';

@Injectable()
export class PostRepository
  extends BaseRepository<PostDocument>
  implements OnApplicationBootstrap
{
  constructor(
    @InjectModel(CollectionName.POST)
    model: Model<PostDocument>,
  ) {
    super(model);
  }

  async onApplicationBootstrap() {
    await this.createCollection();
  }
}
