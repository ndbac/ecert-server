import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../../auth/auth.repository';
import { TokenDetailsDto } from 'src/shared/user.dto';
import { uploadImgToCloud } from 'src/shared/media/uploadMedia.helpers';
import { IMediaLocalPath, IamPhotoType } from 'src/shared/types';
import { DefaultProfilePhotoSize } from 'src/shared/user.types';

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
    const photoUrl = await uploadImgToCloud(
      file,
      DefaultProfilePhotoSize,
      IamPhotoType.JPG,
      tokenDetails.user.userId,
      IMediaLocalPath.PROFILE_PICTURE,
    );
    await this.authRepo.updateById(account._id, { photoUrl });
    return {
      status: 'photo uploaded successfully',
      url: photoUrl,
    };
  }
}
