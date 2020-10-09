import nodemailer from 'nodemailer';

import { DbCreateUser } from '@/data/useCases/users/create/DbCreateUser';
import { BcryptAdapter } from '@/infra/crypto/bcryptAdapter/BcryptAdapter';
import { UsersRepository } from '@/infra/database/typeorm/repositories/UsersRepository';
import { NodemailerAdapter } from '@/infra/mail/NodemailerAdapter';

import mailConfig from '@/main/config/mail';

export const makeDbCreateUser = () => {
  const salt = 12;

  const bcryptAdapter = new BcryptAdapter(salt);
  const usersRepository = new UsersRepository();

  const client = nodemailer.createTransport(mailConfig);
  const nodemailerAdapter = new NodemailerAdapter(client);

  return new DbCreateUser(bcryptAdapter, usersRepository, nodemailerAdapter);
};
