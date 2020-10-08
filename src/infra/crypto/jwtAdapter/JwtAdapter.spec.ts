import jwt from 'jsonwebtoken';
import { JwtAdapter } from './JwtAdapter';

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return Promise.resolve('anytoken');
  },
}));

const makeSut = () => {
  return new JwtAdapter('secret');
};

describe('JwtAdapter Test', () => {
  it('should call jwt sign with correct value', async () => {
    const sut = makeSut();

    const jwtSpy = jest.spyOn(jwt, 'sign');

    await sut.encrypt(1);

    expect(jwtSpy).toHaveBeenCalledWith({ id: 1 }, 'secret');
  });

  it('should throw if jwj sign throws', async () => {
    const sut = makeSut();

    jest
      .spyOn(jwt, 'sign')
      .mockImplementationOnce(() => Promise.reject(new Error()));

    await expect(sut.encrypt(1)).rejects.toThrow();
  });

  it('should return a token on success', async () => {
    const sut = makeSut();

    const response = await sut.encrypt(1);

    expect(response).toBe('anytoken');
  });
});
