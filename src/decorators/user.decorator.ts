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
      case 'email':
        return request.user.email;
      case 'tokenIssue':
        return request.token.tokenIssue;
      case 'tokenExpires':
        return request.token.tokenExpires;
      case 'user':
        return request.user;
      default:
        return {
          user: request.user,
          token: request.token,
        };
    }
  },
);
