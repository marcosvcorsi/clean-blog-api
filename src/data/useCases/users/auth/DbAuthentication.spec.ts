import {
  mockAuthenticationParams,
  mockHasherComparer,
  mockLoadUserByEmailRepository,
} from '@/data/test';
import { DbAuthentication } from './DbAuthentication';

const makeSut = () => {
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepository();
  const hashComparerStub = mockHasherComparer();
  const sut = new DbAuthentication(
    loadUserByEmailRepositoryStub,
    hashComparerStub,
  );

  return { sut, loadUserByEmailRepositoryStub, hashComparerStub };
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
});
