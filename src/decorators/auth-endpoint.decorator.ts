import { SetMetadata } from '@nestjs/common';
import { IamNamespace } from 'src/shared/types';
import { AUTH_METADATA_KEY } from '../modules/auth/auth.types';

export const AuthEndpoint = (...namespaces: IamNamespace[]) =>
  SetMetadata(AUTH_METADATA_KEY, namespaces);
