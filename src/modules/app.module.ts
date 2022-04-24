import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DBRootModule } from './adapters/db/db-root.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { VerifyModule } from './verify/verify.module';
import { NotificationModule } from './notification/notification.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DBRootModule.forMongo(),
    HealthModule,
    AuthModule,
    CommonModule,
    VerifyModule,
    NotificationModule,
    PostModule,
  ],
})
export class AppModule {}
