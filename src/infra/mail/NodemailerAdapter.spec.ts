import nodemailer from 'nodemailer';
import { MailParams } from '@/data/protocols/mail/IMail';
import { NodemailerAdapter } from './NodemailerAdapter';

jest.mock('nodemailer', () => ({
  async createTestAccount(): Promise<any> {
    return {
      user: 'anyuser',
      pass: 'anypass',
    };
  },

  createTransport() {
    return {
      sendMail: () => Promise.resolve({ messageId: 'any' }),
    };
  },

  getTestMessageUrl: () => {},
}));

const makeSut = () => {
  const clientStub = nodemailer.createTransport();

  const sut = new NodemailerAdapter(clientStub);

  return { sut, clientStub };
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
    const { sut, clientStub } = makeSut();

    const transportSpy = jest.spyOn(clientStub, 'sendMail');

    await sut.sendMail(mockMailParams());

    expect(transportSpy).toHaveBeenCalled();
  });

  it('should throw if Nodemailer sendMail throws', async () => {
    const { sut, clientStub } = makeSut();

    jest
      .spyOn(clientStub, 'sendMail')
      .mockReturnValue(Promise.reject(new Error()));

    await expect(sut.sendMail(mockMailParams())).rejects.toThrow();
  });

  it('should send an email on success', async () => {
    const { sut } = makeSut();

    await expect(sut.sendMail(mockMailParams())).resolves;
  });
});
