import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import {
  AccountLoginDto,
  CreateAccountDto,
  ChangePasswordDto,
} from '../dto/auth.dto';
import { HashingService } from '../../common/hashing/hashing.service';
import { JwtService } from '../../common/jwt/jwt.service';
import { TokenDetailsDto } from 'src/shared/user.dto';
import { IamNamespace } from 'src/shared/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly hashingSrv: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: CreateAccountDto) {
    if (data.namespace === IamNamespace.ADMIN) {
      throw new ForbiddenException(
        'You are not allowed to register an admin account',
      );
    }
    const account = {
      ...data,
      password: await this.hashingSrv.hash(data.password),
      active: data.active || true,
      photoUrl: data.photoUrl || process.env.DEFAULT_PROFILE_PHOTO,
      bio: data?.bio || null,
      namespace: data.namespace,
    };
    const createdAccount = await this.authRepo.create(account);
    return {
      userId: createdAccount._id,
      email: createdAccount.email,
      bio: createdAccount.bio,
      name: createdAccount.name,
      namespace: createdAccount.namespace,
      createdAt: createdAccount.createdAt,
      photoUrl: createdAccount.photoUrl,
    };
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
      return {
        id: account._id,
        token: {
          access_token,
          expires_in: new Date(
            Date.now() + parseInt(process.env.TOKEN_EXPIRE_TIME),
          ),
        },
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
