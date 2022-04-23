import {
  Controller,
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
import { VerifyService } from '../providers/verify.service';
import { VerifyAccountInputDto } from '../dto/verify.dto';
import { SecurityDecorator } from 'src/decorators/security-input.decorator';
import { ExtractAuthInput } from 'src/decorators/auth-input.decorator';

@Controller('verify')
@ApiTags('verify')
@UsePipes(ValidationPipe)
export class VerifyController {
  constructor(private readonly verifyService: VerifyService) {}

  @ApiOperation({
    operationId: 'createVerifyAccountToken',
    summary: 'create verify account token',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Verify token created',
  })
  @ApiBody({ type: VerifyAccountInputDto })
  @SecurityDecorator()
  @Put('/createVerifyAccountToken')
  async createVerifyAccountToken(
    @ExtractAuthInput() data: VerifyAccountInputDto,
  ) {
    return await this.verifyService.createVerifycationToken(data);
  }
}
