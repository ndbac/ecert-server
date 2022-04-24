import { Injectable, BadRequestException } from '@nestjs/common';
import { VerifyRepository } from '../verify.repository';
import { CryptoService } from '../../common/crypto/crypto.service';
import { PasswordResetInputDto } from '../dto/verify.dto';
import { AuthRepository } from 'src/modules/auth/auth.repository';
import { NotificationService } from 'src/modules/notification/providers/notification.service';
import {
  ResetPasswordSubject,
  ResetPasswordText,
  AccountVerificationSubject,
  AccountVerificationText,
} from 'src/shared/email/sample-email';
import { EEmailOption } from '../../util/types';
import { ENotificationType } from '../../notification/types';
import { TokenDetailsDto } from 'src/shared/user.dto';

@Injectable()
export class VerifyService {
  constructor(
    private readonly verifyRepo: VerifyRepository,
    private readonly cryptoService: CryptoService,
    private readonly authRepo: AuthRepository,
    private readonly notiService: NotificationService,
  ) {}

  async createVerifycationToken(input: TokenDetailsDto) {
    const account = await this.authRepo.findOneOrFail({
      _id: input.user.userId,
    });
    if (account.verify) {
      throw new BadRequestException(
        `user id: ${account._id} has already verified`,
      );
    }
    const rawToken = await this.cryptoService.generateRandomBytes(32);
    const encryptedToken = await this.cryptoService.encryptText(rawToken);
    const verifyToken = {
      verificationToken: encryptedToken,
      verificationTokenExpires: new Date(
        Date.now() + parseInt(process.env.VERIFY_TOKEN_EXPIRE_TIME),
      ),
    };
    const emailData = {
      from: process.env.EMAIL_SENDER_DEFAULT,
      to: account.email,
      subject: AccountVerificationSubject,
      text: `${AccountVerificationText}: ${rawToken}`,
      option: EEmailOption.TEXT,
      type: ENotificationType.VERIFICATION_ACCOUNT,
    };
    await this.notiService.sendEmail(emailData, account._id);
    const isExist = await this.verifyRepo.findOne({ userId: account._id });
    if (isExist) {
      await this.verifyRepo.updateById(isExist._id, verifyToken);
    } else {
      await this.verifyRepo.create({
        ...verifyToken,
        userId: account._id,
      });
    }
    return {
      status: 'email sent successfully',
      recipient: account.email,
      userId: account._id,
    };
  }

  async createResetPasswordToken(input: PasswordResetInputDto) {
    const account = await this.authRepo.findOneOrFail({ email: input.email });
    const rawToken = await this.cryptoService.generateRandomBytes(32);
    const encryptedToken = await this.cryptoService.encryptText(rawToken);
    const passwordResetToken = {
      passwordResetToken: encryptedToken,
      passwordResetExpires: new Date(
        Date.now() + parseInt(process.env.VERIFY_TOKEN_EXPIRE_TIME),
      ),
    };
    const emailData = {
      from: process.env.EMAIL_SENDER_DEFAULT,
      to: input.email,
      subject: ResetPasswordSubject,
      text: `${ResetPasswordText}: ${rawToken}`,
      option: EEmailOption.TEXT,
      type: ENotificationType.RESET_PASSWORD,
    };
    await this.notiService.sendEmail(emailData, account._id);

    const isExist = await this.verifyRepo.findOne({ userId: account._id });
    if (isExist) {
      await this.verifyRepo.updateOne(
        { userId: account._id },
        passwordResetToken,
      );
    } else {
      await this.verifyRepo.create({
        ...passwordResetToken,
        userId: account._id,
      });
    }
    return {
      status: 'email sent successfully',
      email: input.email,
    };
  }
}
