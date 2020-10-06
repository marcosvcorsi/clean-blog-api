import { ICreateUserRepository } from '@/data/protocols/database/users/ICreateUserRepository';
import { CreateUserParams } from '@/domain/useCases/ICreateUser';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

export class UsersRepository implements ICreateUserRepository {
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
