import slugify from 'slugify';
import * as crypto from 'crypto';
import { Request } from 'express';

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
