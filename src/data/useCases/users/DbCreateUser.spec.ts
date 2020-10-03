import { CreateUserRepository } from '@/data/protocols/users/CreateUserRepository';
import { UserModel } from '@/domain/models/User';
import { CreateUserParams } from '@/domain/useCases/CreateUser';
import { DbCreateUser } from './DbCreateUser';

const mockUserModel = (): UserModel => ({
  id: 1,
  name: 'anyname',
  email: 'anymail@mail.com',
  password: 'anypassword',
});

const mockCreateUserRepository = () => {
  class CreateUserRepositoryStub implements CreateUserRepository {
    async create(): Promise<UserModel> {
      return mockUserModel();
    }
  }

  return new CreateUserRepositoryStub();
};

const makeSut = () => {
  const createUserRepositoryStub = mockCreateUserRepository();

  const sut = new DbCreateUser(createUserRepositoryStub);

  return { sut, createUserRepositoryStub };
};

const mockCreateUserParams = (): CreateUserParams => ({
  name: 'anyname',
  email: 'anymail@mail.com.br',
  password: 'anypassword',
});

describe('DbCreateUser Test', () => {
  it('should call CreateUserRepository with correct values', async () => {
    const { sut, createUserRepositoryStub } = makeSut();

    const repositorySpy = jest.spyOn(createUserRepositoryStub, 'create');

    const createUserParams = mockCreateUserParams();

    await sut.create(createUserParams);

    expect(repositorySpy).toHaveBeenCalledWith(createUserParams);
  });
});
