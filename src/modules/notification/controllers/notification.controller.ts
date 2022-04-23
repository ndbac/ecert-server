import {
  Controller,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger/dist/decorators';
import { NotificationService } from '../providers/notification.service';
import { SendEmailInputDto } from '../dto/notification.dto';

@Controller('notification/:userId')
@ApiTags('notification')
export class NotificationController {
  constructor(private readonly notiService: NotificationService) {}

  @ApiOperation({
    operationId: 'sendEmailNotification',
    summary: 'send email notification',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'notification sent',
  })
  @ApiParam({
    name: 'userId',
  })
  @Post('')
  async sendNotification(
    @Body() input: SendEmailInputDto,
    @Param('userId') userId: string,
  ) {
    return await this.notiService.sendEmail(input, userId);
  }
}
