import { Injectable, ForbiddenException } from '@nestjs/common';
import { AccountRepository } from '../auth.repository';
import {
  AccountLoginDto,
  CreateAccountDto,
  RefreshTokenDto,
} from '../dto/auth.dto';
import { HashingService } from '../../common/hashing/hashing.service';
import { JwtService } from '../../common/jwt/jwt.service';
import { CryptoService } from '../../common/crypto/crypto.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepo: AccountRepository,
    private readonly hashingSrv: HashingService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}

  async register(data: CreateAccountDto) {
    const account = {
      ...data,
      password: await this.hashingSrv.hash(data.password),
      active: data.active || true,
    };
    return await this.accountRepo.create(account);
  }

  async login(data: AccountLoginDto) {
    const account = await this.accountRepo.findOneOrFail({ email: data.email });
    if (await this.hashingSrv.compare(data.password, account.password)) {
      const data = {
        userId: account._id,
        email: account.email,
        namespace: account.namespace,
      };
      const access_token = this.jwtService.generateToken(data);
      const encryptedAccessToken = await this.cryptoService.encryptText(
        access_token,
      );
      await this.accountRepo.updateById(account._id, {
        access_token: encryptedAccessToken,
      });
      return {
        access_token,
        expires_in: process.env.TOKEN_EXPIRE_TIME,
      };
    }
  }

  async refreshToken(data: RefreshTokenDto) {
    const account = await this.accountRepo.findOneOrFail({ _id: data.userId });
    const userToken = await this.cryptoService.decryptText(
      account.access_token,
    );
    if (userToken !== data.access_token) {
      throw new ForbiddenException('invalid access token');
    }
    await this.accountRepo.updateById(account._id, { access_token: null });
    return {
      status: 'successfully',
    };
  }
}
