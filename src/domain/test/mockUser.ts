import { UserModel } from '../models/User';
import {
  AuthenticationResponse,
  IAuthentication,
} from '../useCases/users/IAuthentication';
import { ICreateUser, CreateUserParams } from '../useCases/users/ICreateUser';
import { ILoadUserIdByToken } from '../useCases/users/ILoadUserIdByToken';

export const mockUserModel = (): UserModel => ({
  id: 1,
  name: 'anyname',
  email: 'anymail@mail.com',
  password: 'anypassword',
});

export const mockCreateUserParams = (): CreateUserParams => ({
  name: 'anyname',
  email: 'anymail@mail.com',
  password: 'anypassword',
});

export const mockAuthenticationResponse = (): AuthenticationResponse => ({
  name: 'anyname',
  email: 'anymail@mail.com',
  token: 'anytoken',
});

export const mockCreateUser = () => {
  class CreateUserStub implements ICreateUser {
    async create(): Promise<UserModel> {
      return mockUserModel();
    }
  }

  return new CreateUserStub();
};

export const mockAuthentication = () => {
  class AuthenticationStub implements IAuthentication {
    async auth(): Promise<AuthenticationResponse | null> {
      return mockAuthenticationResponse();
    }
  }

  return new AuthenticationStub();
};

export const mockLoadUserIdByToken = () => {
  class LoadUserIdByTokenStub implements ILoadUserIdByToken {
    async loadUserId(): Promise<number | null> {
      return 1;
    }
  }

  return new LoadUserIdByTokenStub();
};
