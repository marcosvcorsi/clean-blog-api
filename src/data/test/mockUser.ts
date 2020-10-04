import { UserModel } from '@/domain/models/User';
import { mockUserModel } from '@/domain/test';
import { Hasher } from '../protocols/crypto/Hasher';
import { CreateUserRepository } from '../protocols/users/CreateUserRepository';

export const mockCreateUserRepository = () => {
  class CreateUserRepositoryStub implements CreateUserRepository {
    async create(): Promise<UserModel> {
      return mockUserModel();
    }
  }

  return new CreateUserRepositoryStub();
};

export const mockHasher = () => {
  class HasherStub implements Hasher {
    async generate(value: string): Promise<string> {
      return value;
    }
  }

  return new HasherStub();
};
