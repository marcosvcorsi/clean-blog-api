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
});
