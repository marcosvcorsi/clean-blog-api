import { mockCreateUserParams } from '@/domain/test';
import { Connection } from 'typeorm';
import createConnection from '../connection';
import { UsersRepository } from './UsersRepository';

let connection: Connection;

const makeSut = () => {
  return new UsersRepository();
};

describe('UsersRepository Test', () => {
  beforeAll(async () => {
    connection = await createConnection();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM users');
  });

  afterAll(async () => {
    await connection.query('DELETE FROM users');

    await connection.close();
  });

  describe('create()', () => {
    it('should be able to insert a new user', async () => {
      const sut = makeSut();

      const user = await sut.create(mockCreateUserParams());

      expect(user).toBeTruthy();
      expect(user).toHaveProperty('id');
      expect(user.id).toBeTruthy();
    });
  });

  describe('loadByEmail()', () => {
    it('should return null when email does not exists', async () => {
      const sut = makeSut();

      const user = await sut.loadByEmail('anymail@mail.com');

      expect(user).toBeNull();
    });
  });
});
