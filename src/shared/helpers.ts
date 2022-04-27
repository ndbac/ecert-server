import slugify from 'slugify';
import * as crypto from 'crypto';
import * as sharp from 'sharp';
import * as path from 'path';
import { Request } from 'express';
import { IamPhotoType } from './types';

export const makeSlug = (text: string) => {
  const slugEnding = crypto.randomBytes(2).toString('hex');
  return `${slugify(text, { locale: 'vi' })}-${slugEnding}`;
};

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
  name: string,
) => {
  file.filename = `photo-${name}-time-${Date.now()}.${extension}`;

  await sharp(file.buffer)
    .resize({ fit: sharp.fit.contain, width })
    .toFormat(extension)
    .toFile(path.join(`public/images/profile/${file.filename}`));
};
