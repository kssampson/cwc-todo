import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { sendMail } from './mailer';
import { resetPasswordTemplate } from './resentPasswordTemplate';
require('dotenv').config()

@Injectable()
export class MailService {
  async sendPasswordEmailReset(user: User, token: string) {
    const mailOptions = {
      from: `${process.env.GMAIL_USER}`,
      to: `${user.email}`,
      subject: "Password Reset Instructions from Todoucan",
      html: resetPasswordTemplate(token, user.id),
    };
    sendMail(mailOptions, () => console.log('password email sent'))
  }
}
