import { Request } from 'express';
import { IIamUserData } from 'src/shared/user.types';

export const AUTH_METADATA_KEY = 'TIB_BLOG_AUTH_METADATA_KEY';

export interface IAuthorizedRequest extends Request {
  user: IIamUserData;
}
