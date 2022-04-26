import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionName } from 'src/shared/types';
import { CommentDocument } from './comment.model';
import { CommentRepository } from './comment.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CollectionName.COMMENT,
        schema: CommentDocument.schema,
      },
    ]),
  ],
  providers: [CommentRepository],
  exports: [CommentRepository],
})
export class CommentCoreModule {}
