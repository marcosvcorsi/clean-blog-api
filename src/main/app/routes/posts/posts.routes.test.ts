import request from 'supertest';
import { sign } from 'jsonwebtoken';
import { Connection, getRepository } from 'typeorm';
import createConnection from '@/infra/database/typeorm/connection';
import { User } from '@/infra/database/typeorm/entities/User';
import authConfig from '@/main/config/auth';
import app from '../../index';

let connection: Connection;

jest.mock('ioredis');

describe('Posts Routes Test', () => {
  beforeAll(async () => {
    connection = await createConnection();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM posts');
    await connection.query('DELETE FROM users');
  });

  afterAll(async () => {
    await connection.query('DELETE FROM posts');
    await connection.query('DELETE FROM users');

    await connection.close();
  });

  describe('POST /posts', () => {
    it('should return forbidden on POST /posts without Authorization', async () => {
      const response = await request(app).post('/posts').send({
        title: 'anytitle',
        content: 'anycontent',
      });

      expect(response.status).toBe(403);
    });

    it('should create a new post on POST /posts', async () => {
      const userRepository = getRepository(User);

      const fakeUser = userRepository.create({
        name: 'anyname',
        email: 'anymail@mail.com',
        password: 'anypassword',
      });

      await userRepository.save(fakeUser);

      const token = await sign({ userId: fakeUser.id }, authConfig.secret);

      const response = await request(app)
        .post('/posts')
        .send({
          title: 'anytitle',
          content: 'anycontent',
        })
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(201);
      expect(response.body).toBeTruthy();
      expect(response.body).toHaveProperty('id');
    });
  });
});
