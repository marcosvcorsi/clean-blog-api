import { DbCreateUser } from '@/data/useCases/users/DbCreateUser';
import { UsersRepository } from '@/infra/database/typeorm/repositories/UsersRepository';

export const makeDbCreateUser = () => {
  const usersRepository = new UsersRepository();

  return new DbCreateUser(usersRepository);
};
