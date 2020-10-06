import nodemailer, { Transporter } from 'nodemailer';
import { IMail, MailParams } from '@/data/protocols/mail/IMail';

import mailConfig from '@/main/config/mail';

export class NodemailerAdapter implements IMail {
  private client: Transporter;

  async getTransporter() {
    if (!this.client) {
      const { user, pass } = await nodemailer.createTestAccount();

      this.client = nodemailer.createTransport({
        ...mailConfig,
        auth: {
          user,
          pass,
        },
      });
    }

    return this.client;
  }

  async sendMail({ to, subject, html }: MailParams): Promise<void> {
    const transporter = await this.getTransporter();

    const info = await transporter.sendMail({
      from: {
        name: 'Clean Blog',
        address: 'cleanblogapi@test.com',
      },
      to,
      subject,
      html,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}
