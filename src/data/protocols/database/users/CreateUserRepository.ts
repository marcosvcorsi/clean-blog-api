import { UserModel } from '@/domain/models/User';
import { CreateUserParams } from '@/domain/useCases/CreateUser';

export interface CreateUserRepository {
  create(data: CreateUserParams): Promise<UserModel>;
}
