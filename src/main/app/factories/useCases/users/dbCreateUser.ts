import { DbCreateUser } from '@/data/useCases/users/DbCreateUser';
import { BcryptAdapter } from '@/infra/crypto/bcryptAdapter/BcryptAdapter';
import { UsersRepository } from '@/infra/database/typeorm/repositories/UsersRepository';
import { NodemailerAdapter } from '@/infra/mail/NodemailerAdapter';

export const makeDbCreateUser = () => {
  const salt = 12;

  const bcryptAdapter = new BcryptAdapter(salt);
  const usersRepository = new UsersRepository();
  const nodemailerAdapter = new NodemailerAdapter();

  return new DbCreateUser(bcryptAdapter, usersRepository, nodemailerAdapter);
};
