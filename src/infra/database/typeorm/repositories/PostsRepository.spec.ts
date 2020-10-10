import { mockCreatePostParams } from '@/data/test';
import { mockCreateUserParams } from '@/domain/test';
import { Connection, getRepository } from 'typeorm';
import createConnection from '../connection';
import { User } from '../entities/User';
import { PostsRepository } from './PostsRepository';

let connection: Connection;

const makeSut = () => {
  return new PostsRepository();
};

describe('PostRepository Test', () => {
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

  it('should create a new post', async () => {
    const userRepository = getRepository(User);

    const fakeUser = userRepository.create(mockCreateUserParams());

    await userRepository.save(fakeUser);

    const sut = makeSut();

    const post = await sut.create({
      ...mockCreatePostParams(),
      userId: fakeUser.id,
    });

    expect(post).toBeTruthy();
    expect(post).toHaveProperty('id');
    expect(post.id).toBeTruthy();
  });
});
