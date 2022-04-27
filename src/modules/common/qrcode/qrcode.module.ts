import { Module } from '@nestjs/common';
import { QRCodeService } from './qrcode.provider';

@Module({
  providers: [QRCodeService],
  exports: [QRCodeService],
})
export class QrCodeModule {}
