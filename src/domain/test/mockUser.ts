import { UserModel } from '../models/User';
import {
  AuthenticationResponse,
  IAuthentication,
} from '../useCases/IAuthentication';
import { ICreateUser, CreateUserParams } from '../useCases/ICreateUser';

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
    async auth(): Promise<AuthenticationResponse> {
      return mockAuthenticationResponse();
    }
  }

  return new AuthenticationStub();
};
