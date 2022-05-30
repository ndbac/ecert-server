import { Injectable } from '@nestjs/common';
import { AccuracyRepository } from '../accuracy.repository';

@Injectable()
export class UserAccuracyService {
  constructor(private readonly accuracyRepo: AccuracyRepository) {}

  async getCertBySign(signature: string) {
    return await this.accuracyRepo.findOneOrFail({ signature });
  }

  async getCertByUserId(userId: string) {
    const certs = await this.accuracyRepo.find({ userId });
    return certs;
  }
}
