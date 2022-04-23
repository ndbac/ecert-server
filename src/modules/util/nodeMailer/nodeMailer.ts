import * as nodemailer from 'nodemailer';
import { IEmailInputData, EEmailOption } from '../types';

export const sendEmailMachine = async (emailConfig: IEmailInputData) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const data = {
    from: emailConfig.from,
    to: emailConfig.to,
    subject: emailConfig.subject,
  };

  const mailOptions =
    emailConfig.option === EEmailOption.HTML
      ? {
          ...data,
          html: emailConfig.html,
        }
      : {
          ...data,
          text: emailConfig.text,
        };

  await transporter.sendMail(mailOptions);
};
