import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionName } from 'src/shared/types';
import { PostDocument } from './post.model';
import { PostRepository } from './post.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CollectionName.POST,
        schema: PostDocument.schema,
      },
    ]),
  ],
  providers: [PostRepository],
  exports: [PostRepository],
})
export class PostCoreModule {}
