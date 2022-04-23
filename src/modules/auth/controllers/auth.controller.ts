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
  RefreshTokenDto,
} from '../dto/auth.dto';
import {
  AccountResponseDto,
  AccountLoginResponseDto,
} from '../dto/auth-response.dto';
import { SecurityDecorator } from 'src/decorators/security-input.decorator';
import { ExtractAuthInput } from 'src/decorators/auth-input.decorator';

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
    operationId: 'refreshToken',
    summary: 'refresh access token',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token refreshed',
  })
  @ApiBody({ type: RefreshTokenDto })
  @SecurityDecorator()
  @Put('/logout')
  async logoutAccount(@ExtractAuthInput() data: RefreshTokenDto) {
    return await this.authService.refreshToken(data);
  }
}
