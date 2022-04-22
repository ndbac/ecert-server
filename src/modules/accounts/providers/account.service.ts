import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../accounts.repository';
import { CreateAccountDto } from '../dto/create-account.dto';
import { EncryptionService } from '../../common/hashing/hashing.service';

@Injectable()
export class AccountService {
    constructor(private readonly accountRepo: AccountRepository, private readonly encryptionService: EncryptionService) { }

    async createAccount(data: CreateAccountDto) {
        const account = {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: this.encryptionService.encrypt(data.password),
            active: data.active || true,
            type: data.type
        }
        return await this.accountRepo.create(account);
    }
}