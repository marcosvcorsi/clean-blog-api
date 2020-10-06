import { UserModel } from '../models/User';

export type CreateUserParams = Omit<UserModel, 'id'>;

export interface ICreateUser {
  create(data: CreateUserParams): Promise<UserModel>;
}
