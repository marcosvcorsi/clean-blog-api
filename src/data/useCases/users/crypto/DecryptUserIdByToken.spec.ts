import { mockDecrypter } from '@/data/test';
import { DecryptUserIdByToken } from './DecryptUserIdByToken';

const makeSut = () => {
  const decrypterStub = mockDecrypter();
  const sut = new DecryptUserIdByToken(decrypterStub);

  return { sut, decrypterStub };
};

describe('DecryptUserIdByToken Test', () => {
  it('should call Decrypter decrypt with correct value', async () => {
    const { sut, decrypterStub } = makeSut();

    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');

    await sut.loadUserId('anytoken');

    expect(decryptSpy).toHaveBeenCalledWith('anytoken');
  });

  it('should throw if Decrypt decrypt throws', async () => {
    const { sut, decrypterStub } = makeSut();

    jest
      .spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(Promise.reject(new Error()));

    await expect(sut.loadUserId('anytoken')).rejects.toThrow();
  });

  it('should return null if Decrypter decrypt returns null', async () => {
    const { sut, decrypterStub } = makeSut();

    jest
      .spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(Promise.resolve(null));

    const response = await sut.loadUserId('anytoken');

    expect(response).toBeNull();
  });

  it('should return userId on success', async () => {
    const { sut } = makeSut();

    const response = await sut.loadUserId('anytoken');

    expect(response).toBe(1);
  });
});
