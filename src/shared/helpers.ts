import slugify from 'slugify';
import * as crypto from 'crypto';

export const makeSlug = (text: string) => {
  const slugEnding = crypto.randomBytes(2).toString('hex');
  return `${slugify(text, { locale: 'vi' })}-${slugEnding}`;
};
