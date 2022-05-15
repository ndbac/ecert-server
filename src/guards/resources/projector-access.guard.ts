import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { IAuthorizedRequest } from 'src/modules/auth/auth.types';
import { IamNamespace } from 'src/shared/types';

@Injectable()
export class ProjectorAccessGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest<IAuthorizedRequest>();

    if (
      req.user.namespace !== IamNamespace.ADMIN &&
      req.user.namespace !== IamNamespace.PROJECT
    ) {
      throw new ForbiddenException({
        message:
          'Cannot access this api because you are not projector or admin',
      });
    }

    return true;
  }
}
