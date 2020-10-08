import { mockAuthentication } from '@/domain/test';
import { LoginController } from './LoginController';

const makeSut = () => {
  const authenticationStub = mockAuthentication();
  const sut = new LoginController(authenticationStub);

  return { sut, authenticationStub };
};

const mockRequest = () => ({
  body: {
    email: 'anymail@mail.com',
    password: 'anypassword',
  },
});

describe('LoginController Test', () => {
  it('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();

    const authSpy = jest.spyOn(authenticationStub, 'auth');

    const request = mockRequest();

    await sut.handle(request);

    expect(authSpy).toHaveBeenCalledWith(request.body);
  });
});
