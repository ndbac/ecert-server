import { Request } from 'express';
import { IAuthorizedRequest } from './auth.types';

export const getTokenFromAuthorizationHeader = (req: Request) => {
  const authHeader =
    req.headers['authorization'] || req.headers['proxy-authorization'];
  if (authHeader) {
    const tokens = authHeader.split(' ');
    return tokens[0] === 'Bearer' ? tokens[1] : undefined;
  }
  return undefined;
};
