import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../notification.repository';
import { SendEmailInputDto } from '../dto/notification.dto';
import { sendEmailMachine } from '../../util/nodeMailer/nodeMailer';

@Injectable()
export class NotificationService {
  constructor(private readonly notiRepo: NotificationRepository) {}

  async sendEmail(input: SendEmailInputDto, userId: string) {
    await sendEmailMachine(input);
    return await this.notiRepo.create({
      userId,
      emailDetail: {
        sender: input.from,
        recipient: input.to,
        body: input.html || input.text,
        subject: input.subject,
        option: input.option,
        type: input.type,
      },
    });
  }
}
