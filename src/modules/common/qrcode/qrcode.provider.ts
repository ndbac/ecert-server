import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import { IMediaLocalPath } from 'src/shared/types';

const tempDir = `public/${IMediaLocalPath.QR_CODE}`;

@Injectable()
export class QRCodeService {
  async generateQr(filename: string, content: string) {
    try {
      const realFilename = `${filename}.png`;
      await QRCode.toFile(`${tempDir}/${realFilename}`, content);
    } catch (err) {
      throw new Error(err);
    }
  }
}
