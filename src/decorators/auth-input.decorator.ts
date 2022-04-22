import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { getTokenFromAuthorizationHeader } from 'src/modules/auth/auth.helpers';

export const ExtractAuthInput = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    return {
      access_token: getTokenFromAuthorizationHeader(req),
      ...(req.body || {}),
    };
  },
);
