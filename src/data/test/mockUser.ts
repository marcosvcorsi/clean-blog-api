import { UserModel } from '@/domain/models/User';
import { mockUserModel } from '@/domain/test';
import { Hasher } from '../protocols/crypto/Hasher';
import { Mail } from '../protocols/mail/Mail';
import { CreateUserRepository } from '../protocols/database/users/CreateUserRepository';

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

export const mockMail = () => {
  class MailStub implements Mail {
    async sendMail(): Promise<void> {
      return Promise.resolve();
    }
  }

  return new MailStub();
};
