import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../../auth/auth.repository';
import { TokenDetailsDto } from 'src/shared/user.dto';
import * as sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs';
import { cloudinaryUploadImg } from '../../adapters/cloudinary/cloudinary.config';

@Injectable()
export class AccountService {
  constructor(private readonly authRepo: AuthRepository) {}

  async updateProfilePhoto(
    tokenDetails: TokenDetailsDto,
    file: Express.Multer.File,
  ) {
    const account = await this.authRepo.findByIdOrFail(
      tokenDetails.user.userId,
    );
    file.filename = `user-photo-${tokenDetails.user.userId}-${Date.now()}-${
      file.originalname
    }`;

    await sharp(file.buffer)
      .resize(400, 400)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(path.join(`public/images/profile/${file.filename}`));

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
