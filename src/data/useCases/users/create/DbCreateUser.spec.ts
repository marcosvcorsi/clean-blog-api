import {
  mockCreateUserRepository,
  mockHasher,
  mockLoadUserByEmailRepository,
  mockMail,
} from '@/data/test';
import { mockCreateUserParams, mockUserModel } from '@/domain/test';
import { DbCreateUser } from './DbCreateUser';

const makeSut = () => {
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepository();

  jest
    .spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
    .mockReturnValue(Promise.resolve(null));

  const hasherStub = mockHasher();
  const createUserRepositoryStub = mockCreateUserRepository();
  const mailStub = mockMail();

  const sut = new DbCreateUser(
    loadUserByEmailRepositoryStub,
    hasherStub,
    createUserRepositoryStub,
    mailStub,
  );

  return {
    sut,
    loadUserByEmailRepositoryStub,
    createUserRepositoryStub,
    hasherStub,
    mailStub,
  };
};

describe('DbCreateUser Test', () => {
  it('should call LoadUserByEmailRepository with correct value', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut();

    const repositorySpy = jest.spyOn(
      loadUserByEmailRepositoryStub,
      'loadByEmail',
    );

    const createUserParams = mockCreateUserParams();

    await sut.create(createUserParams);

    expect(repositorySpy).toHaveBeenCalledWith(createUserParams.email);
  });

  it('should throw if LoadUserByEmailRepository throws', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut();

    jest
      .spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(Promise.reject(new Error()));

    await expect(sut.create(mockCreateUserParams())).rejects.toThrow();
  });

  it('should return null if LoadUserByEmail repository finds one', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut();

    jest
      .spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(Promise.resolve(mockUserModel()));

    const response = await sut.create(mockCreateUserParams());

    expect(response).toBeNull();
  });

  it('should call CreateUserRepository with correct values', async () => {
    const { sut, createUserRepositoryStub } = makeSut();

    const repositorySpy = jest.spyOn(createUserRepositoryStub, 'create');

    const createUserParams = mockCreateUserParams();

    await sut.create(createUserParams);

    expect(repositorySpy).toHaveBeenCalledWith(createUserParams);
  });

  it('should throw if CreateUserRepository throws', async () => {
    const { sut, createUserRepositoryStub } = makeSut();

    jest
      .spyOn(createUserRepositoryStub, 'create')
      .mockReturnValueOnce(Promise.reject(new Error()));

    await expect(sut.create(mockCreateUserParams())).rejects.toThrow();
  });

  it('should call Hasher with correct value', async () => {
    const { sut, hasherStub } = makeSut();

    const hashSpy = jest.spyOn(hasherStub, 'generate');

    const createUserParams = mockCreateUserParams();

    await sut.create(createUserParams);

    expect(hashSpy).toHaveBeenCalledWith(createUserParams.password);
  });

  it('should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut();

    jest
      .spyOn(hasherStub, 'generate')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const createUserParams = mockCreateUserParams();

    await expect(sut.create(createUserParams)).rejects.toThrow();
  });

  it('should call Mail with correct values', async () => {
    const { sut, mailStub } = makeSut();

    const mailSpy = jest.spyOn(mailStub, 'sendMail');

    const createUserParams = mockCreateUserParams();

    await sut.create(createUserParams);

    expect(mailSpy).toHaveBeenCalled();
  });

  it('should throw if Mail throws', async () => {
    const { sut, mailStub } = makeSut();

    jest
      .spyOn(mailStub, 'sendMail')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const createUserParams = mockCreateUserParams();

    await expect(sut.create(createUserParams)).rejects.toThrow();
  });

  it('should return a user model on success', async () => {
    const { sut } = makeSut();

    const userModel = await sut.create(mockCreateUserParams());

    expect(userModel).toEqual(mockUserModel());
  });
});
