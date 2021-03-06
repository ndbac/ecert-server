import {
  Controller,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger/dist/decorators';
import { UserAccuracyService } from '../providers/user-accuracy.service';
import { AccuracyResDto } from '../dto/accuracy.dto';

@Controller('user/accuracy')
@ApiTags('user.accuracy')
@UsePipes(ValidationPipe)
export class UserAccuracyController {
  constructor(private readonly userAccuracySrv: UserAccuracyService) {}

  @ApiOperation({
    operationId: 'getCertification',
    summary: 'get certification by signature',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'certification data',
    type: AccuracyResDto,
  })
  @ApiParam({ name: 'signature' })
  @Get(':signature')
  async getCertBySignature(@Param('signature') signature: string) {
    return await this.userAccuracySrv.getCertBySign(signature);
  }

  @ApiOperation({
    operationId: 'getCertificationByUserId',
    summary: 'get certification by userId',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'certification data',
    type: AccuracyResDto,
  })
  @ApiParam({ name: 'userId' })
  @Get('/user/:userId')
  async getCertsByUserId(@Param('userId') signature: string) {
    return await this.userAccuracySrv.getCertByUserId(signature);
  }
}
