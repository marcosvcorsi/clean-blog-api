import { DbCreateUser } from '@/data/useCases/users/DbCreateUser';
import { BcryptAdapter } from '@/infra/crypto/bcryptAdapter/BcryptAdapter';
import { UsersRepository } from '@/infra/database/typeorm/repositories/UsersRepository';

export const makeDbCreateUser = () => {
  const salt = 12;

  const bcryptAdapter = new BcryptAdapter(salt);
  const usersRepository = new UsersRepository();

  return new DbCreateUser(bcryptAdapter, usersRepository);
};
