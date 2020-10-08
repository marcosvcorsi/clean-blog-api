import request from 'supertest';
import { hash } from 'bcrypt';
import { Connection, getRepository } from 'typeorm';
import { User } from '@/infra/database/typeorm/entities/User';
import createConnection from '@/infra/database/typeorm/connection';
import app from '../../index';

let connection: Connection;

describe('Login Route Test', () => {
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

  it('should not be able to authenticate with invalid credentials', async () => {
    const response = await request(app).post('/login').send({
      email: 'anymail@mail.com',
      password: 'anypassword',
    });

    expect(response.status).toBe(401);
  });

  it('should be able to authenticate with valid credentials', async () => {
    const email = 'anymail@mail.com';
    const password = 'anypassword';
    const salt = 12;

    const hashedPassword = await hash(password, salt);

    const userRepository = getRepository(User);

    const fakeUser = userRepository.create({
      name: 'anyname',
      email,
      password: hashedPassword,
    });

    await userRepository.save(fakeUser);

    const response = await request(app).post('/login').send({
      email,
      password: 'anypassword',
    });

    expect(response.status).toBe(200);
    expect(response.body.email).toBe(email);
    expect(response.body).toHaveProperty('token');
  });
});
