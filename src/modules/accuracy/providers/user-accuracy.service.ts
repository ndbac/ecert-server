import { Injectable } from '@nestjs/common';
import { AccuracyRepository } from '../accuracy.repository';

@Injectable()
export class UserAccuracyService {
  constructor(private readonly accuracyRepo: AccuracyRepository) {}

  async getCertBySign(signature: string) {
    return await this.accuracyRepo.findOne({ signature });
  }
}
