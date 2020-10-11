import { AccessDeniedError } from '../errors/AccessDeniedError';
import { forbidden } from '../helpers/http';
import { AuthMiddleware } from './AuthMiddleware';

const makeSut = () => {
  const sut = new AuthMiddleware();

  return { sut };
};

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
});
