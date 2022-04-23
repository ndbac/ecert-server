import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionName } from 'src/shared/types';
import { VerifyDocument } from './verify.model';
import { VerifyRepository } from './verify.repository';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CollectionName.VERIFICATION,
        schema: VerifyDocument.schema,
      },
    ]),
  ],
  providers: [VerifyRepository],
  exports: [VerifyRepository],
})
export class VerifyCoreModule {}
