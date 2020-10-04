import { mockUserModel } from '@/domain/test';
import { CreateUser } from '@/domain/useCases/CreateUser';
import { User } from '@/infra/database/typeorm/entities/User';
import { CreateUserController } from './CreateUserController';

const mockCreateUser = () => {
  class CreateUserStub implements CreateUser {
    async create(): Promise<User> {
      return mockUserModel();
    }
  }

  return new CreateUserStub();
};

const makeSut = () => {
  const createUserStub = mockCreateUser();

  const sut = new CreateUserController(createUserStub);

  return { sut, createUserStub };
};

const mockRequest = () => ({
  body: {
    name: 'anyname',
    email: 'anymail@mail.com',
    password: 'anypassword',
    passwordConfirmation: 'anypassword',
  },
});

describe('CreateUserController Test', () => {
  it('should call CreateUser with correct values', async () => {
    const { sut, createUserStub } = makeSut();

    const createUserSpy = jest.spyOn(createUserStub, 'create');

    const request = mockRequest();

    await sut.handle(request);

    const { name, email, password } = request.body;

    expect(createUserSpy).toHaveBeenCalledWith({ name, email, password });
  });
});
