import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-defs';
import { IGeneralErrorShape } from './errors.types';

export function createGeneralExceptionError(error: any): IGeneralErrorShape {
  if (!!error && error instanceof HttpException) {
    const response = error.getResponse() as any;
    return {
      ...response,
      message: response.message,
      errorCode: response.errorCode || ErrorCode.UNKNOWN_ERROR,
      statusCode: error.getStatus(),
    };
  }
  return {
    message: error.message || 'An unknown error occurred',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode: ErrorCode.UNKNOWN_ERROR,
  };
}
