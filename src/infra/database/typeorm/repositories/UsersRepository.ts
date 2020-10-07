import { ICreateUserRepository } from '@/data/protocols/database/users/ICreateUserRepository';
import { ILoadUserByEmailRepository } from '@/data/protocols/database/users/ILoadUserByEmailRepository';
import { CreateUserParams } from '@/domain/useCases/ICreateUser';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

export class UsersRepository
  implements ICreateUserRepository, ILoadUserByEmailRepository {
  private readonly usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getRepository(User);
  }

  async create(data: CreateUserParams): Promise<User> {
    const user = this.usersRepository.create(data);

    await this.usersRepository.save(user);

    return user;
  }

  async loadByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    return user || null;
  }
}
