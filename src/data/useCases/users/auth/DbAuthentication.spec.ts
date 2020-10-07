import {
  mockAuthenticationParams,
  mockEncrypter,
  mockHashComparer,
  mockLoadUserByEmailRepository,
} from '@/data/test';
import { DbAuthentication } from './DbAuthentication';

const makeSut = () => {
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepository();
  const hashComparerStub = mockHashComparer();
  const encrypterStub = mockEncrypter();

  const sut = new DbAuthentication(
    loadUserByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
  );

  return {
    sut,
    loadUserByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
  };
};

describe('DbAuthentication Test', () => {
  it('should call LoadUserByEmailRepository with correct value', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut();

    const repositorySpy = jest.spyOn(
      loadUserByEmailRepositoryStub,
      'loadByEmail',
    );

    const authenticationParams = mockAuthenticationParams();

    await sut.auth(authenticationParams);

    expect(repositorySpy).toHaveBeenCalledWith(authenticationParams.email);
  });

  it('should throw if LoadUserByEmailRepository throws', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut();

    jest
      .spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(Promise.reject(new Error()));

    await expect(sut.auth(mockAuthenticationParams())).rejects.toThrow();
  });

  it('should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut();

    const hashSpy = jest.spyOn(hashComparerStub, 'compare');

    const authenticationParams = mockAuthenticationParams();

    await sut.auth(authenticationParams);

    const { password } = authenticationParams;

    expect(hashSpy).toHaveBeenCalledWith(password, password);
  });

  it('should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut();

    jest
      .spyOn(hashComparerStub, 'compare')
      .mockReturnValueOnce(Promise.reject(new Error()));

    await expect(sut.auth(mockAuthenticationParams())).rejects.toThrow();
  });

  it('should call Encrypter with correct value', async () => {
    const { sut, encrypterStub } = makeSut();

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

    const authenticationParams = mockAuthenticationParams();

    await sut.auth(authenticationParams);

    expect(encryptSpy).toHaveBeenCalledWith(1);
  });

  it('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();

    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(Promise.reject(new Error()));

    await expect(sut.auth(mockAuthenticationParams())).rejects.toThrow();
  });

  it('should return null if LoadUserByEmailRepository return null', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut();

    jest
      .spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(Promise.resolve(null));

    const response = await sut.auth(mockAuthenticationParams());

    expect(response).toBeNull();
  });

  it('should return null if HashComparer compare returns false', async () => {
    const { sut, hashComparerStub } = makeSut();

    jest
      .spyOn(hashComparerStub, 'compare')
      .mockReturnValueOnce(Promise.resolve(false));

    const response = await sut.auth(mockAuthenticationParams());

    expect(response).toBeNull();
  });

  it('should return name, email and token on success', async () => {
    const { sut } = makeSut();

    const response = await sut.auth(mockAuthenticationParams());

    expect(response).toBeTruthy();
    expect(response).toHaveProperty('name');
    expect(response).toHaveProperty('email');
    expect(response).toHaveProperty('token');
  });
});
