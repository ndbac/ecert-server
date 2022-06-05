import { Injectable, ForbiddenException } from '@nestjs/common';
import * as config from 'config';
import { AccuracyRepository } from '../accuracy.repository';
import { QRCodeService } from 'src/modules/common/qrcode/qrcode.provider';
import { TokenDetailsDto } from 'src/shared/user.dto';
import {
  AccuracyInputDto,
  sendCertificationInputDto,
} from '../dto/accuracy.dto';
import { CryptoService } from 'src/modules/common/crypto/crypto.service';
import { JimpService } from 'src/modules/common/jimp/jimp.provider';
import { IamPhotoType, IMediaLocalPath } from 'src/shared/types';
import { saveImgToTempDir } from 'src/shared/media/uploadMedia.helpers';
import { sendEmailMachine } from '../../util/nodeMailer/nodeMailer';
import { EEmailOption } from '../../util/types';

@Injectable()
export class AccuracyService {
  constructor(
    private readonly accuracyRepo: AccuracyRepository,
    private readonly qrcodeService: QRCodeService,
    private readonly cryptoSrv: CryptoService,
    private readonly jimpSrv: JimpService,
  ) {}

  async dataAccuracyManually(
    tokenDetails: TokenDetailsDto,
    input: AccuracyInputDto,
  ) {
    const fileName = `user-${tokenDetails.user.userId}-time-${Date.now()}`;
    const signature = await this.cryptoSrv.generateRandomBytes(16);
    const prefixUrl = config.get<string>('accuracy.prefixUrl');
    const qrLink = await this.qrcodeService.generateQrAndUploadToCloud(
      fileName,
      `${prefixUrl}/${tokenDetails.user.userId}/${signature}`,
    );
    return await this.accuracyRepo.create({
      data: input.data,
      subject: input.subject,
      name: input.name,
      email: input.email,
      qrCode: qrLink,
      userId: tokenDetails.user.userId,
      signature,
    });
  }

  async dataAccuracyAutomatically(
    tokenDetails: TokenDetailsDto,
    input: AccuracyInputDto,
    file: Express.Multer.File,
  ) {
    const photoPath = await saveImgToTempDir(
      file,
      IamPhotoType.JPG,
      IMediaLocalPath.PHOTO,
    );
    const fileName = `user-${tokenDetails.user.userId}-time-${Date.now()}`;
    const signature = await this.cryptoSrv.generateRandomBytes(16);
    const prefixUrl = config.get<string>('accuracy.prefixUrl');
    const qrPath = await this.qrcodeService.generateQr(
      fileName,
      `${prefixUrl}/certification/${signature}`,
    );
    await this.jimpSrv.resizePhoto(photoPath, 1800);
    const savedTextPhotoPath = await this.jimpSrv.addText(
      photoPath,
      `Reference no: ${signature}`,
      fileName,
      IamPhotoType.JPG,
    );
    const savedQrPhotoPath = await this.jimpSrv.addWatermark(
      savedTextPhotoPath,
      qrPath,
      fileName,
      IamPhotoType.JPG,
    );
    return await this.accuracyRepo.create({
      data: input.data,
      subject: input.subject,
      name: input.name,
      email: input.email,
      qrCode: savedQrPhotoPath,
      userId: tokenDetails.user.userId,
      signature,
    });
  }

  async sendCertification(
    tokenDetails: TokenDetailsDto,
    input: sendCertificationInputDto,
  ) {
    const certi = await this.accuracyRepo.findOneOrFail({
      signature: input.signature,
    });
    if (certi.userId !== tokenDetails.user.userId) {
      throw new ForbiddenException('You cannot access this route');
    }
    const text = `Signature: ${certi.signature}, Check in our website: https://www.ecert.site/certification/${certi.signature}`;
    const data = {
      from: process.env.EMAIL_USERNAME,
      to: input.email,
      subject: 'eCert - New Certification Sending To You',
      text,
      option: EEmailOption.TEXT,
    };
    await sendEmailMachine(data);
    return {
      msg: 'email sent',
    };
  }
}
