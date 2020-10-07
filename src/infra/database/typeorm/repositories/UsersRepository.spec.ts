import { mockCreateUserParams } from '@/domain/test';
import { Connection, getRepository } from 'typeorm';
import createConnection from '../connection';
import { User } from '../entities/User';
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

    it('should return an user by email', async () => {
      const sut = makeSut();

      const userRepository = getRepository(User);

      const fakeUser = userRepository.create(mockCreateUserParams());

      await userRepository.save(fakeUser);

      const user = await sut.loadByEmail('anymail@mail.com');

      expect(user).toBeTruthy();
      expect(user?.id).toBeTruthy();
      expect(user?.email).toBe('anymail@mail.com');
    });
  });
});
