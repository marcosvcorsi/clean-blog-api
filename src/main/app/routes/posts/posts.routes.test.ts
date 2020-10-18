import request from 'supertest';
import { sign } from 'jsonwebtoken';
import { Connection, getRepository } from 'typeorm';
import createConnection from '@/infra/database/typeorm/connection';
import { User } from '@/infra/database/typeorm/entities/User';
import authConfig from '@/main/config/auth';
import { Post } from '@/infra/database/typeorm/entities/Post';
import app from '../../index';

let connection: Connection;

jest.mock('ioredis');

const mockUserToken = async () => {
  const userRepository = getRepository(User);

  const fakeUser = userRepository.create({
    name: 'anyname',
    email: 'anymail@mail.com',
    password: 'anypassword',
  });

  await userRepository.save(fakeUser);

  const userId = fakeUser.id;

  const token = await sign({ userId }, authConfig.secret);

  return { token, userId };
};

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
      const { token, userId } = await mockUserToken();

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
      expect(response.body.userId).toBe(userId);
    });
  });

  describe('GET /posts', () => {
    it('should return forbidden on GET /posts without authorization', async () => {
      const response = await request(app).get('/posts');

      expect(response.status).toBe(403);
    });

    it('should return user posts on GET /posts', async () => {
      const { token, userId } = await mockUserToken();

      const postsRepository = getRepository(Post);

      const post = postsRepository.create({
        userId,
        title: 'anytitle',
        content: 'anycontent',
        date: new Date(),
      });

      await postsRepository.save(post);

      const response = await request(app)
        .get('/posts')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].id).toBe(post.id);
      expect(response.body[0].userId).toBe(userId);
    });
  });
});
