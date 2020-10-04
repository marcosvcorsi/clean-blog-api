import bcrypt from 'bcrypt';

import { BcryptAdapter } from './BcryptAdapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hash_value');
  },
}));

const salt = 12;

const makeSut = () => {
  return new BcryptAdapter(salt);
};

describe('BcryptAdapter Test', () => {
  it('should call bcrypt hash with correct value', async () => {
    const sut = makeSut();

    const hashSpy = jest.spyOn(bcrypt, 'hash');

    await sut.generate('anyvalue');

    expect(hashSpy).toHaveBeenCalledWith('anyvalue', salt);
  });

  it('should throw if bcrypt hash throws', async () => {
    const sut = makeSut();

    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(Promise.reject(new Error()));

    await expect(sut.generate('anyvalue')).rejects.toThrow();
  });
});
