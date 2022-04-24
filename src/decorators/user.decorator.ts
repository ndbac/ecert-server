import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAuthorizedRequest } from 'src/modules/auth/auth.types';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<IAuthorizedRequest>();
    switch (data) {
      case 'userId':
        return request.user.userId;
      case 'namespace':
        return request.user.namespace;
      case 'identifier':
        return request.user.identifier;
      default:
        return request.user;
    }
  },
);
