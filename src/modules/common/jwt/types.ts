import { IamNamespace } from 'src/shared/types';

export interface IJwtDataInput {
  userId: string;
  email: string;
  namespace: IamNamespace;
}
