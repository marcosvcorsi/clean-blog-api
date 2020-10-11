import jwt from 'jsonwebtoken';
import { JwtAdapter } from './JwtAdapter';

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return Promise.resolve('anytoken');
  },

  async verify(): Promise<object> {
    return Promise.resolve({ userId: 1 });
  },
}));

const makeSut = () => {
  return new JwtAdapter('secret');
};

describe('JwtAdapter Test', () => {
  describe('encrypt()', () => {
    it('should call jwt sign with correct value', async () => {
      const sut = makeSut();

      const jwtSpy = jest.spyOn(jwt, 'sign');

      await sut.encrypt(1);

      expect(jwtSpy).toHaveBeenCalledWith({ userId: 1 }, 'secret');
    });

    it('should throw if jwt sign throws', async () => {
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

  describe('decrypt()', () => {
    it('should call jwt verify with correct values', async () => {
      const sut = makeSut();

      const verifySpy = jest.spyOn(jwt, 'verify');

      await sut.decrypt('anytoken');

      expect(verifySpy).toHaveBeenCalledWith('anytoken', 'secret');
    });
  });
});
