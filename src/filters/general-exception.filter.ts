import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { createGeneralExceptionError } from 'src/errors/errors';

@Catch()
export class GeneralExceptionFilter extends BaseExceptionFilter {
  catch(err: Error | HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const responseErr = createGeneralExceptionError(err);
    response.status(responseErr.statusCode).json(responseErr);
  }
}
