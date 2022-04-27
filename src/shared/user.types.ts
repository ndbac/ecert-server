import { IamNamespace } from 'src/shared/types';

export interface IIamUserData {
  namespace: IamNamespace;
  userId: string;
  email: string;
}

export const DefaultProfilePhotoSize = 800;
