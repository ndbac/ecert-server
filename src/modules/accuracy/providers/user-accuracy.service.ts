import { Injectable, NotFoundException } from '@nestjs/common';
import { AccuracyRepository } from '../accuracy.repository';
import _ from 'lodash';

@Injectable()
export class UserAccuracyService {
  constructor(private readonly accuracyRepo: AccuracyRepository) {}

  async getCertBySign(signature: string) {
    return await this.accuracyRepo.findOneOrFail({ signature });
  }

  async getCertByUserId(userId: string) {
    const certs = await this.accuracyRepo.find({ userId });
    if (_.isEmpty(certs)) {
      throw new NotFoundException('Not found');
    }
    return certs;
  }
}
