import { UserModel } from '../models/User';
import { ICreateUser, CreateUserParams } from '../useCases/ICreateUser';

export const mockUserModel = (): UserModel => ({
  id: 1,
  name: 'anyname',
  email: 'anymail@mail.com',
  password: 'anypassword',
});

export const mockCreateUserParams = (): CreateUserParams => ({
  name: 'anyname',
  email: 'anymail@mail.com.br',
  password: 'anypassword',
});

export const mockCreateUser = () => {
  class CreateUserStub implements ICreateUser {
    async create(): Promise<UserModel> {
      return mockUserModel();
    }
  }

  return new CreateUserStub();
};
