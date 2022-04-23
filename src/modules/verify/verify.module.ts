import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { VerifyCoreModule } from './verify.core.module';
import { VerifyService } from './providers/verify.service';
import { VerifyController } from './controlleres/verify.controller';
import { AuthCoreModule } from '../auth/auth.core.module';

@Module({
  imports: [VerifyCoreModule, CommonModule, AuthCoreModule],
  providers: [VerifyService],
  controllers: [VerifyController],
})
export class VerifyModule {}
