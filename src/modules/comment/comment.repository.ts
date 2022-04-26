import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/shared/mongoose/base.repository';
import { CollectionName } from 'src/shared/types';
import { CommentDocument } from './comment.model';

@Injectable()
export class CommentRepository
  extends BaseRepository<CommentDocument>
  implements OnApplicationBootstrap
{
  constructor(
    @InjectModel(CollectionName.COMMENT)
    model: Model<CommentDocument>,
  ) {
    super(model);
  }

  async onApplicationBootstrap() {
    await this.createCollection();
  }
}
