import { UserModel } from '../models/User';

export type CreateUserParams = Omit<UserModel, 'id'>;

export interface CreateUser {
  create(data: CreateUserParams): Promise<UserModel>;
}
