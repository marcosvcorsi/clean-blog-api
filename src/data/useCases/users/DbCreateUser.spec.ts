import { mockCreateUserRepository, mockHasher } from '@/data/test';
import { mockCreateUserParams, mockUserModel } from '@/domain/test';
import { DbCreateUser } from './DbCreateUser';

const makeSut = () => {
  const hasherStub = mockHasher();
  const createUserRepositoryStub = mockCreateUserRepository();

  const sut = new DbCreateUser(hasherStub, createUserRepositoryStub);

  return { sut, createUserRepositoryStub, hasherStub };
};

describe('DbCreateUser Test', () => {
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

  it('should return a user model on success', async () => {
    const { sut } = makeSut();

    const userModel = await sut.create(mockCreateUserParams());

    expect(userModel).toEqual(mockUserModel());
  });
});
