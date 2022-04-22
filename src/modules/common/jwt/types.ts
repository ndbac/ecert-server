import { EAccountType } from 'src/shared/types';

export interface IJwtDataInput {
  id: string;
  email: string;
  type: EAccountType;
}
