import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionName } from 'src/shared/types';
import { CategoryDocument } from './category.model';
import { CategoryRepository } from './category.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CollectionName.CATEGORY,
        schema: CategoryDocument.schema,
      },
    ]),
  ],
  providers: [CategoryRepository],
  exports: [CategoryRepository],
})
export class CategoryCoreModule {}
