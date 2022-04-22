import { Injectable } from '@nestjs/common';
import { IJwtDataInput } from './types';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  generateToken(data: IJwtDataInput) {
    return jwt.sign({ data }, process.env.JWT_KEY, { expiresIn: process.env.TOKEN_EXPIRE_TIME });
  }
}
