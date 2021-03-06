import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/shared/mongoose/base.repository';
import { CollectionName } from 'src/shared/types';
import { AuthDocument } from './auth.model';

@Injectable()
export class AuthRepository
  extends BaseRepository<AuthDocument>
  implements OnApplicationBootstrap
{
  constructor(
    @InjectModel(CollectionName.AUTH)
    model: Model<AuthDocument>,
  ) {
    super(model);
  }

  async onApplicationBootstrap() {
    await this.createCollection();
  }
}
