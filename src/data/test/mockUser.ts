import { UserModel } from '@/domain/models/User';
import { AuthenticationParams } from '@/domain/useCases/IAuthentication';
import { mockUserModel } from '@/domain/test';
import { IHasher } from '../protocols/crypto/IHasher';
import { IMail } from '../protocols/mail/IMail';
import { ICreateUserRepository } from '../protocols/database/users/ICreateUserRepository';
import { ILoadUserByEmailRepository } from '../protocols/database/users/ILoadUserByEmailRepository';

export const mockCreateUserRepository = () => {
  class CreateUserRepositoryStub implements ICreateUserRepository {
    async create(): Promise<UserModel> {
      return mockUserModel();
    }
  }

  return new CreateUserRepositoryStub();
};

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: 'anymail@mail.com',
  password: 'anypassword',
});

export const mockLoadUserByEmailRepository = () => {
  class LoadUserByEmailRepositoryStub implements ILoadUserByEmailRepository {
    async loadByEmail(): Promise<UserModel> {
      return mockUserModel();
    }
  }

  return new LoadUserByEmailRepositoryStub();
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
