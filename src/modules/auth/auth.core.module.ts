import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionName } from 'src/shared/types';
import { AccountDocument } from './auth.model';
import { AccountRepository } from './auth.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CollectionName.ACCOUNTS,
        schema: AccountDocument.schema,
      },
    ]),
  ],
  providers: [AccountRepository],
  exports: [AccountRepository],
})
export class AccountCoreModule {}
