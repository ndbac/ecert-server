import { Module } from '@nestjs/common';
import { AccountController } from './controllers/accounts.controller';
import { AccountCoreModule } from './accounts.core.module';
import { AccountService } from './providers/account.service';
import { CommonModule } from '../common/common.module';

@Module({
    imports: [
        AccountCoreModule,
        CommonModule,
    ],
    providers: [AccountService],
    controllers: [AccountController],
})
export class AccountModule { }
