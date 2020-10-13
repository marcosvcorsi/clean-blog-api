import request from 'supertest';
import { Connection } from 'typeorm';
import createConnection from '@/infra/database/typeorm/connection';
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

  it('should return forbidden on POST /posts without Authorization', async () => {
    const response = await request(app).post('/posts').send({
      title: 'anytitle',
      content: 'anycontent',
    });

    expect(response.status).toBe(403);
  });
});
