import { UserModel } from '@/domain/models/User';
import { AuthenticationParams } from '@/domain/useCases/IAuthentication';
import { mockUserModel } from '@/domain/test';
import { IHasher } from '../protocols/crypto/IHasher';
import { IMail } from '../protocols/mail/IMail';
import { ICreateUserRepository } from '../protocols/database/users/ICreateUserRepository';
import { ILoadUserByEmailRepository } from '../protocols/database/users/ILoadUserByEmailRepository';
import { IHasherComparer } from '../protocols/crypto/IHasherComparer';
import { IEncrypter } from '../protocols/crypto/IEncrypter';

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
    async loadByEmail(): Promise<UserModel | null> {
      return mockUserModel();
    }
  }

  return new LoadUserByEmailRepositoryStub();
};

export const mockHasherComparer = () => {
  class HashComparerStub implements IHasherComparer {
    async compare(): Promise<boolean> {
      return true;
    }
  }

  return new HashComparerStub();
};

export const mockHasher = () => {
  class HasherStub implements IHasher {
    async generate(value: string): Promise<string> {
      return value;
    }
  }

  return new HasherStub();
};

export const mockEncrypter = () => {
  class EncrypterStub implements IEncrypter {
    async encrypt(): Promise<string> {
      return 'encryptedvalue';
    }
  }

  return new EncrypterStub();
};

export const mockMail = () => {
  class MailStub implements IMail {
    async sendMail(): Promise<void> {
      return Promise.resolve();
    }
  }

  return new MailStub();
};
