import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IamNamespace } from 'src/shared/types';
import {
  AUTH_METADATA_KEY,
  IAuthorizedRequest,
} from '../modules/auth/auth.types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(ctx: ExecutionContext) {
    const authMetadata = this.reflector.get<IamNamespace[] | undefined>(
      AUTH_METADATA_KEY,
      ctx.getHandler(),
    );
    const authReq = ctx.switchToHttp().getRequest<IAuthorizedRequest>();
    return (
      !authMetadata ||
      (authReq.user && authMetadata.includes(authReq.user.namespace)) ||
      (!authReq.user && authMetadata.includes(IamNamespace.GUEST))
    );
  }
}
