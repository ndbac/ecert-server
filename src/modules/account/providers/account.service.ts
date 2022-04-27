import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../../auth/auth.repository';
import { TokenDetailsDto } from 'src/shared/user.dto';
import { imageTransformWithAutoHeight } from 'src/shared/helpers';
import { UploadPhotoDto } from '../dto/account.dto';
import * as fs from 'fs';
import { cloudinaryUploadImg } from '../../adapters/cloudinary/cloudinary.config';

@Injectable()
export class AccountService {
  constructor(private readonly authRepo: AuthRepository) {}

  async updateProfilePhoto(
    tokenDetails: TokenDetailsDto,
    file: Express.Multer.File,
    imgConfig: UploadPhotoDto,
  ) {
    const account = await this.authRepo.findByIdOrFail(
      tokenDetails.user.userId,
    );

    await imageTransformWithAutoHeight(
      file,
      parseInt(imgConfig.width),
      imgConfig.extension,
      tokenDetails.user.userId,
    );

    const localPath = `public/images/profile/${file.filename}`;
    const imgUploaded = await cloudinaryUploadImg(localPath);

    fs.unlinkSync(localPath);

    await this.authRepo.updateById(account._id, { photoUrl: imgUploaded.url });

    return {
      status: 'photo uploaded successfully',
      url: imgUploaded.url,
    };
  }
}
