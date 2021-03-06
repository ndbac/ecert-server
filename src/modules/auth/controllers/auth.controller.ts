import {
  Body,
  Controller,
  Post,
  Put,
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
} from '@nestjs/swagger/dist/decorators';
import { AuthService } from '../providers/auth.service';
import {
  CreateAccountDto,
  AccountLoginDto,
  ChangePasswordDto,
} from '../dto/auth.dto';
import {
  AccountResponseDto,
  AccountLoginResponseDto,
  ChangePasswordResponseDto,
} from '../dto/auth-response.dto';
import { SecurityDecorator } from 'src/decorators/security-input.decorator';
import { User } from 'src/decorators/user.decorator';
import { TokenDetailsDto } from 'src/shared/user.dto';

@Controller('auth')
@ApiTags('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    operationId: 'createAccount',
    summary: 'create a new account',
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Account created',
    type: AccountResponseDto,
  })
  @ApiBody({ type: CreateAccountDto })
  @Post('/register')
  async createAccount(@Body() data: CreateAccountDto) {
    return await this.authService.register(data);
  }

  @ApiOperation({
    operationId: 'loginAccount',
    summary: 'login a account',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Account logged',
    type: AccountLoginResponseDto,
  })
  @ApiBody({ type: AccountLoginDto })
  @Put('/login')
  async loginAccount(@Body() data: AccountLoginDto) {
    return await this.authService.login(data);
  }

  @ApiOperation({
    operationId: 'changePassword',
    summary: 'change account password',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'password changed',
    type: ChangePasswordResponseDto,
  })
  @ApiBody({ type: ChangePasswordDto })
  @SecurityDecorator()
  @Put('/change-password')
  async changePassword(
    @User('') userData: TokenDetailsDto,
    @Body() passwordData: ChangePasswordDto,
  ) {
    return await this.authService.changePassword(userData, passwordData);
  }

  @ApiOperation({
    operationId: 'logoutAccount',
    summary: 'logout account & make token invalid',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'account logout successfully',
  })
  @SecurityDecorator()
  @Put('/logout')
  async logoutAccount(@User('') userData: TokenDetailsDto) {
    return await this.authService.makeTokenInvalid(userData);
  }
}
