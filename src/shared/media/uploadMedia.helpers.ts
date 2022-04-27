import * as sharp from 'sharp';
import * as path from 'path';
import { Request } from 'express';
import { IamPhotoType, IMediaLocalPath } from '../types';
import { cloudinaryUploadImg } from 'src/modules/adapters/cloudinary/cloudinary.config';
import * as fs from 'fs';

export const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: any,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const imageTransformWithAutoHeight = async (
  file: Express.Multer.File,
  width: number,
  extension: IamPhotoType,
  identifier: string,
  pathDestination: IMediaLocalPath,
) => {
  file.filename = `photo-${identifier}-time-${Date.now()}.${extension}`;

  await sharp(file.buffer)
    .resize({ fit: sharp.fit.contain, width })
    .toFormat(extension)
    .toFile(path.join(`src/public/${pathDestination}/${file.filename}`));

  return `src/public/${pathDestination}/${file.filename}`;
};

export const uploadImgToCloud = async (
  file: Express.Multer.File,
  width: number,
  extension: IamPhotoType,
  identifier: string,
  pathDestination: IMediaLocalPath,
) => {
  const localPath = await imageTransformWithAutoHeight(
    file,
    width,
    extension,
    identifier,
    pathDestination,
  );
  const result = await cloudinaryUploadImg(localPath);
  fs.unlinkSync(localPath);
  return result.url;
};
