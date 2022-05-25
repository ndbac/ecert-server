import {
  Controller,
  Put,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger/dist/decorators';
import { VerifyService } from '../providers/verify.service';
import { PasswordResetInputDto } from '../dto/verify.dto';
import { SecurityDecorator } from 'src/decorators/security-input.decorator';
import { User } from 'src/decorators/user.decorator';
import { TokenDetailsDto } from 'src/shared/user.dto';

@Controller('verify')
@ApiTags('verify')
@UsePipes(ValidationPipe)
export class VerifyController {
  constructor(private readonly verifyService: VerifyService) {}

  @ApiOperation({
    operationId: 'createResetPasswordToken',
    summary: 'create reset password token',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Reset password token created',
  })
  @ApiBody({ type: PasswordResetInputDto })
  @Put('/createResetPasswordToken')
  async createResetPasswordToken(@Body() data: PasswordResetInputDto) {
    return await this.verifyService.createResetPasswordToken(data);
  }

  @ApiOperation({
    operationId: 'createVerifyAccountToken',
    summary: 'create verify account token',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Verify token created',
  })
  @SecurityDecorator()
  @Put('/createVerifyAccountToken')
  async createVerifyAccountToken(@User('') userData: TokenDetailsDto) {
    return await this.verifyService.createVerifycationToken(userData);
  }

  @ApiOperation({
    operationId: 'verifyAccount',
    summary: 'user verify account',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Account verified',
  })
  @ApiParam({ name: 'verifyToken' })
  @SecurityDecorator()
  @Put('/:verifyToken')
  async verifyAccount(
    @User('') userData: TokenDetailsDto,
    @Param('verifyToken') verifyToken: string,
  ) {
    return await this.verifyService.verifyAccount(userData, verifyToken);
  }
}
