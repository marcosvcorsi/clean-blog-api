import { UserModel } from '@/domain/models/User';
import { mockUserModel } from '@/domain/test';
import { IHasher } from '../protocols/crypto/IHasher';
import { IMail } from '../protocols/mail/IMail';
import { ICreateUserRepository } from '../protocols/database/users/ICreateUserRepository';

export const mockCreateUserRepository = () => {
  class CreateUserRepositoryStub implements ICreateUserRepository {
    async create(): Promise<UserModel> {
      return mockUserModel();
    }
  }

  return new CreateUserRepositoryStub();
};

export const mockHasher = () => {
  class HasherStub implements IHasher {
    async generate(value: string): Promise<string> {
      return value;
    }
  }

  return new HasherStub();
};

export const mockMail = () => {
  class MailStub implements IMail {
    async sendMail(): Promise<void> {
      return Promise.resolve();
    }
  }

  return new MailStub();
};
