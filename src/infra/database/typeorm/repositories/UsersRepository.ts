import { CreateUserRepository } from '@/data/protocols/database/users/CreateUserRepository';
import { CreateUserParams } from '@/domain/useCases/CreateUser';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

export class UsersRepository implements CreateUserRepository {
  private readonly usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getRepository(User);
  }

  async create(data: CreateUserParams): Promise<User> {
    const user = this.usersRepository.create(data);

    await this.usersRepository.save(user);

    return user;
  }
}
