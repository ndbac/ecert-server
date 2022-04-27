import { Injectable } from '@nestjs/common';
import { AccuracyRepository } from '../accuracy.repository';
import { QRCodeService } from 'src/modules/common/qrcode/qrcode.provider';
import { TokenDetailsDto } from 'src/shared/user.dto';
import { AccuracyInputDto } from '../dto/accuracy.dto';
import { CryptoService } from 'src/modules/common/crypto/crypto.service';
import { JimpService } from 'src/modules/common/jimp/jimp.provider';

@Injectable()
export class AccuracyService {
  constructor(
    private readonly accuracyRepo: AccuracyRepository,
    private readonly qrcodeService: QRCodeService,
    private readonly cryptoSrv: CryptoService,
    private readonly jimpSrv: JimpService,
  ) {}

  async dataAccuracy(tokenDetails: TokenDetailsDto, input: AccuracyInputDto) {
    const fileName = `user-${tokenDetails.user.userId}-time-${Date.now()}`;
    const qrLink = await this.qrcodeService.generateQrAndUploadToCloud(
      fileName,
      input.data,
    );
    const signature = await this.cryptoSrv.generateRandomBytes(32);
    return await this.accuracyRepo.create({
      data: input.data,
      qrCode: qrLink,
      userId: tokenDetails.user.userId,
      signature,
    });
  }
}
