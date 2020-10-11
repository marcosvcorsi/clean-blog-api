import { UserModel } from '@/domain/models/User';
import { AuthenticationParams } from '@/domain/useCases/users/IAuthentication';
import { mockUserModel } from '@/domain/test';
import { IHasher } from '../protocols/crypto/IHasher';
import { IMail } from '../protocols/mail/IMail';
import { ICreateUserRepository } from '../protocols/database/users/ICreateUserRepository';
import { ILoadUserByEmailRepository } from '../protocols/database/users/ILoadUserByEmailRepository';
import { IHashComparer } from '../protocols/crypto/IHashComparer';
import { IEncrypter } from '../protocols/crypto/IEncrypter';
import { IDecrypter } from '../protocols/crypto/IDecrypter';

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

export const mockHashComparer = () => {
  class HashComparerStub implements IHashComparer {
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

export const mockDecrypter = () => {
  class DecrypterStub implements IDecrypter {
    async decrypt(): Promise<any> {
      return { userId: 1 };
    }
  }

  return new DecrypterStub();
};

export const mockMail = () => {
  class MailStub implements IMail {
    async sendMail(): Promise<void> {
      return Promise.resolve();
    }
  }

  return new MailStub();
};
