import {
  Controller,
  Post,
  Body,
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
import { AccuracyService } from '../providers/accuracy.service';
import { SecurityDecorator } from 'src/decorators/security-input.decorator';
import { User } from 'src/decorators/user.decorator';
import { TokenDetailsDto } from 'src/shared/user.dto';
import { AccuracyInputDto, AccuracyResDto } from '../dto/accuracy.dto';

@Controller('accuracy')
@ApiTags('accuracy')
@UsePipes(ValidationPipe)
export class AccuracyController {
  constructor(private readonly accuracySrv: AccuracyService) {}

  @ApiOperation({
    operationId: 'dataAccuracy',
    summary: 'data accuracy by qrcode & signature',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'data accuracy',
    type: AccuracyResDto,
  })
  @ApiBody({ type: AccuracyInputDto })
  @SecurityDecorator()
  @Post('')
  async createVerifyAccountToken(
    @User('') userData: TokenDetailsDto,
    @Body() input: AccuracyInputDto,
  ) {
    return await this.accuracySrv.dataAccuracy(userData, input);
  }
}
