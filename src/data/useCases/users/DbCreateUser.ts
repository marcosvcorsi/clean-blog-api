import { CreateUserRepository } from '@/data/protocols/users/CreateUserRepository';
import { UserModel } from '@/domain/models/User';
import { CreateUser, CreateUserParams } from '@/domain/useCases/CreateUser';

export class DbCreateUser implements CreateUser {
  constructor(private readonly createUserRepository: CreateUserRepository) {}

  async create(data: CreateUserParams): Promise<UserModel> {
    await this.createUserRepository.create(data);

    return {} as UserModel;
  }
}
