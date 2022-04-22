import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';

export const SecurityDecorator = () => {
  return applyDecorators(ApiBearerAuth(), ApiSecurity('x-zp-auth-provider'));
};
