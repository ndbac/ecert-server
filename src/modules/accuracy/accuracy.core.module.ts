import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionName } from 'src/shared/types';
import { AccuracyDocument } from './accuracy.model';
import { AccuracyRepository } from './accuracy.repository';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CollectionName.ACCURACY,
        schema: AccuracyDocument.schema,
      },
    ]),
  ],
  providers: [AccuracyRepository],
  exports: [AccuracyRepository],
})
export class AccuracyCoreModule {}
