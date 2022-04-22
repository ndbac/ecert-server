import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  UNKNOWN_ERROR = 'BAC0000',
}

export const ERROR_CONFIG: Record<
  string,
  | {
      statusCode: number;
      errorCode?: string;
      message: string;
    }
  | undefined
> = {
  [ErrorCode.UNKNOWN_ERROR]: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Something wrong happened, please inform the team to check',
  },
};
