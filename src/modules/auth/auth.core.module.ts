import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionName } from 'src/shared/types';
import { AuthDocument } from './auth.model';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CollectionName.AUTH,
        schema: AuthDocument.schema,
      },
    ]),
  ],
  providers: [AuthRepository],
  exports: [AuthRepository],
})
export class AuthCoreModule {}
