import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DBRootModule } from './adapters/db/db-root.module';
import { HealthModule } from './health/health.module';
import { AccountModule } from './accounts/accounts.module';
import { CommonModule } from './common/common.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DBRootModule.forMongo(),
        HealthModule,
        AccountModule,
        CommonModule,
    ],
})
export class AppModule { }
