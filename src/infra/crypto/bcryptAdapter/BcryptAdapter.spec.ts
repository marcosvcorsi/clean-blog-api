import bcrypt from 'bcrypt';

import { BcryptAdapter } from './BcryptAdapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hashedvalue');
  },

  async compare(): Promise<boolean> {
    return Promise.resolve(true);
  },
}));

const salt = 12;

const makeSut = () => {
  return new BcryptAdapter(salt);
};

describe('BcryptAdapter Test', () => {
  describe('hash()', () => {
    it('should call bcrypt hash with correct value', async () => {
      const sut = makeSut();

      const hashSpy = jest.spyOn(bcrypt, 'hash');

      await sut.generate('anyvalue');

      expect(hashSpy).toHaveBeenCalledWith('anyvalue', salt);
    });

    it('should throw if bcrypt hash throws', async () => {
      const sut = makeSut();

      jest
        .spyOn(bcrypt, 'hash')
        .mockReturnValueOnce(Promise.reject(new Error()));

      await expect(sut.generate('anyvalue')).rejects.toThrow();
    });

    it('should return hash value on success', async () => {
      const sut = makeSut();

      const hashedValue = await sut.generate('anyvalue');

      expect(hashedValue).toBe('hashedvalue');
    });
  });

  describe('compare()', () => {
    it('should call bcrypt compare with correct values', async () => {
      const sut = makeSut();

      const compareSpy = jest.spyOn(bcrypt, 'compare');

      await sut.compare('anyvalue', 'hashedvalue');

      expect(compareSpy).toHaveBeenCalledWith('anyvalue', 'hashedvalue');
    });

    it('should throw if bcrypt compare throws', async () => {
      const sut = makeSut();

      jest
        .spyOn(bcrypt, 'compare')
        .mockReturnValueOnce(Promise.reject(new Error()));

      await expect(sut.compare('anyvalue', 'hashedvalue')).rejects.toThrow();
    });

    it('should return false if bcrypt compare returns false', async () => {
      const sut = makeSut();

      jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.resolve(false));

      const response = await sut.compare('anyvalue', 'hashedvalue');

      expect(response).toBe(false);
    });

    it('should return true on bcrypt compare success', async () => {
      const sut = makeSut();

      const response = await sut.compare('anyvalue', 'hashedvalue');

      expect(response).toBe(true);
    });
  });
});
