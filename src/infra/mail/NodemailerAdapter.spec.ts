import { MailParams } from '@/data/protocols/mail/Mail';
import { NodemailerAdapter } from './NodemailerAdapter';

jest.mock('nodemailer', () => ({
  async createTestAccount(): Promise<any> {
    return {
      user: 'anyuser',
      pass: 'anypass',
    };
  },

  async createTransport() {
    return {
      sendMail: () => Promise.resolve(),
    };
  },
}));

const makeSut = () => {
  return new NodemailerAdapter();
};

const mockMailParams = (): MailParams => ({
  to: {
    name: 'anyname',
    address: 'anymail@mail.com',
  },
  subject: 'any',
  html: 'anyhtml,',
});

describe('NodemailAdapter Test', () => {
  it('should call Nodemailer sendMail with correct values', async () => {
    const sut = makeSut();

    const client = await sut.getTransporter();

    const transportSpy = jest.spyOn(client, 'sendMail');

    await sut.sendMail(mockMailParams());

    expect(transportSpy).toHaveBeenCalled();
  });

  it('should throw if Nodemailer sendMail throws', async () => {
    const sut = makeSut();

    const client = await sut.getTransporter();

    jest.spyOn(client, 'sendMail').mockReturnValue(Promise.reject(new Error()));

    await expect(sut.sendMail(mockMailParams())).rejects.toThrow();
  });

  it('should send an email on success', async () => {
    const sut = makeSut();

    await expect(sut.sendMail(mockMailParams())).resolves;
  });
});
