import request from 'supertest';
import { Connection } from 'typeorm';
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
});
