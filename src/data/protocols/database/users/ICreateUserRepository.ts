import { UserModel } from '@/domain/models/User';
import { CreateUserParams } from '@/domain/useCases/users/ICreateUser';

export interface ICreateUserRepository {
  create(data: CreateUserParams): Promise<UserModel>;
}
