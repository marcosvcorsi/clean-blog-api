import { UserModel } from '@/domain/models/User';
import { mockUserModel } from '@/domain/test';
import { CreateUserRepository } from '../protocols/users/CreateUserRepository';

export const mockCreateUserRepository = () => {
  class CreateUserRepositoryStub implements CreateUserRepository {
    async create(): Promise<UserModel> {
      return mockUserModel();
    }
  }

  return new CreateUserRepositoryStub();
};
