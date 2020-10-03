import { UserModel } from '../models/User';
import { CreateUserParams } from '../useCases/CreateUser';

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
