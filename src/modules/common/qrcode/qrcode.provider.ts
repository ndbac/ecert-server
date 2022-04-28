import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import { IMediaLocalPath } from 'src/shared/types';
import * as fs from 'fs';
import { cloudinaryUploadImg } from 'src/modules/adapters/cloudinary/cloudinary.config';

const tempDir = `temp/${IMediaLocalPath.QR_CODE}`;

@Injectable()
export class QRCodeService {
  async generateQrAndUploadToCloud(filename: string, content: string) {
    try {
      const localPath = `${tempDir}/${filename}.png`;
      await QRCode.toFile(localPath, content);
      const qr = await cloudinaryUploadImg(localPath);
      fs.unlinkSync(localPath);
      return qr.url;
    } catch (err) {
      throw new Error(err);
    }
  }

  async generateQr(filename: string, content: string) {
    try {
      const localPath = `${tempDir}/${filename}.png`;
      await QRCode.toFile(localPath, content);
      return localPath;
    } catch (err) {
      throw new Error(err);
    }
  }
}
