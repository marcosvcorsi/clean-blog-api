import nodemailer, { Transporter } from 'nodemailer';
import { IMail, MailParams } from '@/data/protocols/mail/IMail';

export class NodemailerAdapter implements IMail {
  constructor(private readonly client: Transporter) {}

  async sendMail({ to, subject, html }: MailParams): Promise<void> {
    const info = await this.client.sendMail({
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
