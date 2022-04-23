import { Injectable, ForbiddenException } from '@nestjs/common';
import _ from 'lodash';
import { VerifyRepository } from '../verify.repository';
import { CryptoService } from '../../common/crypto/crypto.service';
import { VerifyAccountInputDto } from '../dto/verify.dto';
import { AuthRepository } from 'src/modules/auth/auth.repository';

@Injectable()
export class VerifyService {
  constructor(
    private readonly verifyRepo: VerifyRepository,
    private readonly cryptoService: CryptoService,
    private readonly authRepo: AuthRepository,
  ) {}

  async createVerifycationToken(input: VerifyAccountInputDto) {
    const account = await this.authRepo.findOneOrFail({ _id: input.userId });
    const checkToken = await this.cryptoService.compare(
      input.access_token,
      account.access_token || '',
    );
    if (!checkToken) {
      throw new ForbiddenException('invalid access token');
    }
    const rawToken = await this.cryptoService.generateRandomBytes(32);
    const encryptedToken = await this.cryptoService.encryptText(rawToken);
    const verifyToken = {
      verificationToken: encryptedToken,
      verificationTokenExpires:
        Date.now() + process.env.VERIFY_TOKEN_EXPIRE_TIME,
    };
    const isExist = await this.verifyRepo.findOne({ userId: input.userId });
    if (isExist) {
      return await this.verifyRepo.updateById(isExist._id, verifyToken);
    }
    return await this.verifyRepo.create({
      ...verifyToken,
      userId: input.userId,
    });
  }
}
