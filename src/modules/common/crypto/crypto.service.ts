import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  async generateRandomBytes(length: number) {
    return crypto.randomBytes(length).toString('hex');
  }

  async hashingText(rawText: string) {
    return crypto.createHash('sha256').update(rawText).digest('hex');
  }

  async encryptText(rawText: string) {
    return CryptoJS.AES.encrypt(rawText, process.env.CRYPTO_KEY).toString();
  }

  async decryptText(encryptedText: string) {
    const bytes = CryptoJS.AES.decrypt(encryptedText, process.env.CRYPTO_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  async compare(rawText: string, encryptedText: string) {
    const decryptedText = await this.decryptText(encryptedText);
    return rawText === decryptedText;
  }

  async encryptObject(rawObject: object) {
    return CryptoJS.AES.encrypt(
      JSON.stringify(rawObject),
      process.env.CRYPTO_KEY,
    ).toString();
  }

  async decryptObject(encryptedObject: string) {
    const bytes = CryptoJS.AES.decrypt(encryptedObject, process.env.CRYPTO_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
}
