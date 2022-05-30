import { Injectable } from '@nestjs/common';
import * as config from 'config';
import { AccuracyRepository } from '../accuracy.repository';
import { QRCodeService } from 'src/modules/common/qrcode/qrcode.provider';
import { TokenDetailsDto } from 'src/shared/user.dto';
import { AccuracyInputDto } from '../dto/accuracy.dto';
import { CryptoService } from 'src/modules/common/crypto/crypto.service';
import { JimpService } from 'src/modules/common/jimp/jimp.provider';
import { IamPhotoType, IMediaLocalPath } from 'src/shared/types';
import { saveImgToTempDir } from 'src/shared/media/uploadMedia.helpers';

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
      `${prefixUrl}/${tokenDetails.user.userId}/${signature}`,
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
      qrCode: savedQrPhotoPath,
      userId: tokenDetails.user.userId,
      signature,
    });
  }
}
