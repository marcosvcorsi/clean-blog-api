import request from 'supertest';
import { Connection } from 'typeorm';
import createConnection from '@/infra/database/typeorm/connection';
import app from '../../index';

jest.mock('nodemailer', () => ({
  async createTestAccount(): Promise<any> {
    return {
      user: 'anyuser',
      pass: 'anypass',
    };
  },

  createTransport() {
    return {
      sendMail: () => Promise.resolve({ messageId: 'any' }),
    };
  },

  getTestMessageUrl: () => {},
}));

let connection: Connection;

describe('Users Routes Test', () => {
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

  it('should create a new user on POST /users', async () => {
    const response = await request(app).post('/users').send({
      name: 'anyname',
      email: 'anymail@mail.com',
      password: 'anypassword',
      passwordConfirmation: 'anypassword',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body.name).toBe('anyname');
    expect(response.body.email).toBe('anymail@mail.com');
  });
});
