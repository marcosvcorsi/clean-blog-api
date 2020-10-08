import { mockAuthentication } from '@/domain/test';
import { serverError } from '@/presentation/helpers/http';
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

  it('should return serverError if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();

    jest
      .spyOn(authenticationStub, 'auth')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const response = await sut.handle(mockRequest());

    expect(response).toEqual(serverError(new Error()));
  });
});
