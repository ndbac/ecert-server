import { Module } from '@nestjs/common';
import { HashingModule } from './hashing/hashing.module';
import { HashingService } from './hashing/hashing.service';
import { JwtModule } from './jwt/jwt.module';
import { JwtService } from './jwt/jwt.service';

@Module({
  imports: [HashingModule, JwtModule],
  providers: [HashingService, JwtService],
  exports: [HashingService, JwtService],
})
export class CommonModule {}
