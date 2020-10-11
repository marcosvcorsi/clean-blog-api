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
});
