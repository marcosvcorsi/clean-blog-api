import {
  mockAuthenticationParams,
  mockLoadUserByEmailRepository,
} from '@/data/test';
import { DbAuthentication } from './DbAuthentication';

const makeSut = () => {
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepository();
  const sut = new DbAuthentication(loadUserByEmailRepositoryStub);

  return { sut, loadUserByEmailRepositoryStub };
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
});
