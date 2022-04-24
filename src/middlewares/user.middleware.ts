import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getTokenFromAuthorizationHeader } from 'src/modules/auth/auth.helpers';
import * as jwt from 'jsonwebtoken';
import { AuthRepository } from 'src/modules/auth/auth.repository';
import { getTime } from 'date-fns';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly authRepo: AuthRepository) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authToken = getTokenFromAuthorizationHeader(req);
      if (!authToken) {
        return next();
      }
      const rawData = jwt.verify(authToken, process.env.JWT_KEY);
      let data: any;
      if (typeof rawData === 'string') {
        data = JSON.parse(rawData);
      } else {
        data = rawData;
      }
      const account = await this.authRepo.findOneOrFail({
        _id: data.data.userId,
      });
      if (getTime(data.iat) < getTime(account.passwordChanged) / 1000) {
        throw new ForbiddenException('invalid token');
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
      throw error;
    }
  }
}
