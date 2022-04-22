import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../accounts.repository';
import { AccountLoginDto, CreateAccountDto } from '../dto/account.dto';
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
        id: account._id,
        email: account.email,
        type: account.type,
      };
      return {
        token: this.jwtService.generateToken(data),
      };
    }
  }
}
