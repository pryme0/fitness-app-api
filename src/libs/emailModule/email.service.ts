import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendReminderEmail(
    to: string,
    subject: string,
    content: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject,
      html: `
        <h1>${subject}</h1>
        <p>${content}</p>
      `,
    });
  }
}
