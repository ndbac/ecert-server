import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getTokenFromAuthorizationHeader } from 'src/modules/auth/auth.helpers';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authToken = getTokenFromAuthorizationHeader(req);
      if (!authToken) {
        throw new ForbiddenException('invalid token');
      }
      const rawData = jwt.verify(authToken, process.env.JWT_KEY);
      let data: any;
      if (typeof rawData === 'string') {
        data = JSON.parse(rawData);
      } else {
        data = rawData;
      }
      req['user'] = {
        namespace: data.data.namespace,
        userId: data.data.userId,
        email: data.data.email,
      };
      req['token'] = {
        tokenIssue: data.iat,
        tokenExpires: data.exp,
      };
      return next();
    } catch (error) {
      return next();
    }
  }
}
