import { SetMetadata } from '@nestjs/common';
import { IamNamespace } from 'src/shared/types';
import { AUTH_METADATA_KEY } from '../modules/auth/auth.types';

export interface AuthEndpointDto {
  namespaces?: IamNamespace[];
}

export const AuthEndpoint = (namespaces: AuthEndpointDto) =>
  SetMetadata(AUTH_METADATA_KEY, namespaces);
