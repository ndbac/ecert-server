import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthCoreModule } from './auth.core.module';
import { AuthService } from './providers/auth.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [AuthCoreModule, CommonModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
