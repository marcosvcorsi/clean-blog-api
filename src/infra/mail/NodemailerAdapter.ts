import nodemailer, { Transporter } from 'nodemailer';
import { Mail, MailParams } from '@/data/protocols/mail/Mail';

export class NodemailerAdapter implements Mail {
  private client: Transporter;

  async getTransporter() {
    if (!this.client) {
      const account = await nodemailer.createTestAccount();

      this.client = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass, // generated ethereal password
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
