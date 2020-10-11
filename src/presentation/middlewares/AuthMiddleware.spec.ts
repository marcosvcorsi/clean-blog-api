import { mockLoadUserIdByToken } from '@/domain/test';
import { AccessDeniedError } from '../errors/AccessDeniedError';
import { forbidden, serverError } from '../helpers/http';
import { AuthMiddleware } from './AuthMiddleware';

const makeSut = () => {
  const loadUserIdByTokenStub = mockLoadUserIdByToken();
  const sut = new AuthMiddleware(loadUserIdByTokenStub);

  return { sut, loadUserIdByTokenStub };
};

const mockRequest = () => ({
  headers: {
    authorization: 'Bearer anytoken',
  },
});

describe('AuthMiddleware Test', () => {
  it('should return forbidden if no headers was provided', async () => {
    const { sut } = makeSut();

    const response = await sut.handle({});

    expect(response).toEqual(forbidden(new AccessDeniedError()));
  });

  it('should return forbidden if no authorization was provided', async () => {
    const { sut } = makeSut();

    const response = await sut.handle({ headers: {} });

    expect(response).toEqual(forbidden(new AccessDeniedError()));
  });

  it('shoud call LoadUserIdByToken with correct values', async () => {
    const { sut, loadUserIdByTokenStub } = makeSut();

    const loadUserIdSpy = jest.spyOn(loadUserIdByTokenStub, 'loadUserId');

    await sut.handle(mockRequest());

    expect(loadUserIdSpy).toHaveBeenCalledWith('anytoken');
  });

  it('should return serverError if LoadUserIdByToken throws', async () => {
    const { sut, loadUserIdByTokenStub } = makeSut();

    jest
      .spyOn(loadUserIdByTokenStub, 'loadUserId')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const response = await sut.handle(mockRequest());

    expect(response).toEqual(serverError(new Error()));
  });
});
