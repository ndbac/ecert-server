import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.provider';

@Injectable()
export class EncryptionService {
  constructor(private readonly hashingService: HashingService) {}

  encrypt(rawText: string) {
    return this.hashingService.encrypt(rawText);
  }

  decrypt(encryptedText: string) {
    return this.hashingService.decrypt(encryptedText);
  }
}
