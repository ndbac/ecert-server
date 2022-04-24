import { IamNamespace } from 'src/shared/types';

export interface IIamUserData {
  namespace: IamNamespace;
  userId: string;
  identifier: string;
  iat: number;
  exp: number;
}
