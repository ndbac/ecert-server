import { Module } from '@nestjs/common';
import { HashingModule } from './hashing/hashing.module';
import { HashingService } from './hashing/hashing.service';
import { JwtModule } from './jwt/jwt.module';
import { JwtService } from './jwt/jwt.service';
import { CryptoModule } from './crypto/crypto.module';
import { CryptoService } from './crypto/crypto.service';
import { QrCodeModule } from './qrcode/qrcode.module';

@Module({
  imports: [HashingModule, JwtModule, CryptoModule, QrCodeModule],
  providers: [HashingService, JwtService, CryptoService],
  exports: [HashingService, JwtService, CryptoService],
})
export class CommonModule {}
