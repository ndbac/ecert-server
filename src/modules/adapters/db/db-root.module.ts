import { DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/**
 * Handle Database connection.
 */
export class DBRootModule {
  static forMongo(): DynamicModule {
    return MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    });
  }
}
