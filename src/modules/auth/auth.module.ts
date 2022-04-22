import { Module } from '@nestjs/common';
import { AccountController } from './controllers/auth.controller';
import { AccountCoreModule } from './auth.core.module';
import { AccountService } from './providers/auth.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [AccountCoreModule, CommonModule],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
