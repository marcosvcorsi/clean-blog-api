import { mockCreatePostParams } from '@/data/test';
import { mockCreateUserParams } from '@/domain/test';
import { Connection, getRepository } from 'typeorm';
import createConnection from '../connection';
import { Post } from '../entities/Post';
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

  it('should list all posts', async () => {
    const userRepository = getRepository(User);

    const fakeUser = userRepository.create(mockCreateUserParams());

    await userRepository.save(fakeUser);

    const postRepository = getRepository(Post);

    const createPostParams = mockCreatePostParams();

    const fakePost = postRepository.create({
      ...createPostParams,
      userId: fakeUser.id,
    });

    await postRepository.save(fakePost);

    const sut = makeSut();

    const posts = await sut.findByUser(fakeUser.id);

    expect(posts).toBeTruthy();
    expect(posts).toHaveLength(1);
    expect(posts[0].title).toBe(createPostParams.title);
    expect(posts[0].content).toBe(createPostParams.content);
  });
});
