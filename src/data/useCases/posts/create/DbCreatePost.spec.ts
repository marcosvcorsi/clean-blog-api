import MockDate from 'mockdate';
import {
  mockCreatePostParams,
  mockCreatePostRepository,
} from '@/data/test/mockPost';
import { DbCreatePost } from './DbCreatePost';

const makeSut = () => {
  const createPostRepositoryStub = mockCreatePostRepository();
  const sut = new DbCreatePost(createPostRepositoryStub);

  return { sut, createPostRepositoryStub };
};

describe('DbCreatePost Test', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should call CreatePostRepository with correct values', async () => {
    const { sut, createPostRepositoryStub } = makeSut();

    const repositorySpy = jest.spyOn(createPostRepositoryStub, 'create');

    const createPostParams = mockCreatePostParams();

    await sut.create(createPostParams);

    expect(repositorySpy).toHaveBeenCalledWith(createPostParams);
  });

  it('should throw if CreatePostRepository throws', async () => {
    const { sut, createPostRepositoryStub } = makeSut();

    jest
      .spyOn(createPostRepositoryStub, 'create')
      .mockReturnValueOnce(Promise.reject(new Error()));

    await expect(sut.create(mockCreatePostParams())).rejects.toThrow();
  });
});
