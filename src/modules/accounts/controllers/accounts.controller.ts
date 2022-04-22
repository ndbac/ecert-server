import { Body, Controller, Post, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import {
    ApiTags,
    ApiBody,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger/dist/decorators';
import { AuthDecorator } from 'src/decorators/swagger-auth';
import { AccountService } from '../providers/account.service';
import { CreateAccountDto, AccountResponseDto, AccountLoginDto } from '../dto/account.dto';

@Controller('account/auth')
@ApiTags('account.auth')
@UsePipes(ValidationPipe)
@AuthDecorator()
export class AccountController {
    constructor(private readonly accountService: AccountService) { }

    @ApiOperation({
        operationId: 'createAccount',
        summary: 'create a new account'
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
        return await this.accountService.register(data);
    }

    @ApiOperation({
        operationId: 'loginAccount',
        summary: 'login a account'
    })
    @HttpCode(HttpStatus.ACCEPTED)
    @ApiResponse({
        status: HttpStatus.ACCEPTED,
        description: 'Account created',
        type: AccountLoginDto,
    })
    @ApiBody({ type: AccountLoginDto })
    @Post('/login')
    async loginAccount(@Body() data: AccountLoginDto) {
        return await this.accountService.login(data);
    }
}