import { Request } from 'express';
import { IIamUserData } from 'src/shared/user.types';

export const AUTH_METADATA_KEY = 'ZAAPI_AUTH_METADATA_KEY';

export interface IAuthorizedRequest extends Request {
  user: IIamUserData;
}
