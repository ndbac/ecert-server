import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashingService {
  async hash(rawText: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedText = await bcrypt.hash(rawText, salt);
    return hashedText;
  }

  async compare(rawText: string, hashedText: string) {
    return await bcrypt.compare(rawText, hashedText);
  }
}
