import { Body, Controller, Post, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import {
    ApiTags,
    ApiBody,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger/dist/decorators';
import { AuthDecorator } from 'src/decorators/swagger-auth';
import { AccountService } from '../providers/account.service';
import { CreateAccountDto } from '../dto/create-account.dto';
import { AccountResponseDto } from '../dto/account-response.dto';

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
    @Post()
    async create(@Body() data: CreateAccountDto) {
        return await this.accountService.createAccount(data);
    }
}