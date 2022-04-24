import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import {
  AccountLoginDto,
  CreateAccountDto,
  RefreshTokenDto,
  ChangePasswordDto,
} from '../dto/auth.dto';
import { HashingService } from '../../common/hashing/hashing.service';
import { JwtService } from '../../common/jwt/jwt.service';
import { CryptoService } from '../../common/crypto/crypto.service';
import { TokenDetailsDto } from 'src/shared/user.dto';
// import { getTime } from 'date-fns';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
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
    return await this.authRepo.create(account);
  }

  async login(data: AccountLoginDto) {
    const account = await this.authRepo.findOneOrFail({ email: data.email });
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
      await this.authRepo.updateById(account._id, {
        access_token: encryptedAccessToken,
      });
      return {
        id: account._id,
        access_token,
        expires_in: new Date(
          Date.now() + parseInt(process.env.TOKEN_EXPIRE_TIME),
        ),
      };
    }
    throw new ForbiddenException('invalid password');
  }

  async changePassword(
    userData: TokenDetailsDto,
    passwordData: ChangePasswordDto,
  ) {
    const account = await this.authRepo.findOneOrFail({
      _id: userData.user.userId,
    });
    if (
      await this.hashingSrv.compare(passwordData.oldPassword, account.password)
    ) {
      if (passwordData.newPassword === passwordData.oldPassword) {
        throw new BadRequestException(
          'new password is identical with old password',
        );
      }
      const hashedNewPassword = await this.hashingSrv.hash(
        passwordData.newPassword,
      );
      await this.authRepo.updateById(account._id, {
        password: hashedNewPassword,
        passwordChanged: new Date(),
      });
      return {
        status: 'password changed successfully',
        userId: userData.user.userId,
      };
    }
    throw new ForbiddenException('invalid password');
  }

  async makeTokenInvalid(data: TokenDetailsDto) {
    return {
      status: 'this route is not supported yet',
    };
  }
}
