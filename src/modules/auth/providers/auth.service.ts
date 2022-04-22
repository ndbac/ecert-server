import { Injectable, ForbiddenException } from '@nestjs/common';
import { AccountRepository } from '../auth.repository';
import {
  AccountLoginDto,
  CreateAccountDto,
  RefreshTokenDto,
} from '../dto/auth.dto';
import { HashingService } from '../../common/hashing/hashing.service';
import { JwtService } from '../../common/jwt/jwt.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepo: AccountRepository,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: CreateAccountDto) {
    const account = {
      ...data,
      password: await this.hashingService.hash(data.password),
      active: data.active || true,
    };
    return await this.accountRepo.create(account);
  }

  async login(data: AccountLoginDto) {
    const account = await this.accountRepo.findOneOrFail({ email: data.email });
    if (await this.hashingService.compare(data.password, account.password)) {
      const data = {
        userId: account._id,
        email: account.email,
        namespace: account.namespace,
      };
      const access_token = this.jwtService.generateToken(data);
      await this.accountRepo.updateById(account._id, { access_token });
      return {
        access_token,
        expires_in: process.env.TOKEN_EXPIRE_TIME,
      };
    }
  }

  async refreshToken(data: RefreshTokenDto) {
    const account = await this.accountRepo.findOneOrFail({ _id: data.userId });
    if (account.access_token !== data.access_token) {
      throw new ForbiddenException('Invalid access token');
    }
    await this.accountRepo.updateById(account._id, { access_token: null });
    return {
      status: 'successfully',
    };
  }
}
