import MockDate from 'mockdate';
import {
  mockCreatePostParams,
  mockCreatePostRepository,
  mockPostModel,
  mockClearCache,
} from '@/data/test';
import { DbCreatePost } from './DbCreatePost';

const makeSut = () => {
  const createPostRepositoryStub = mockCreatePostRepository();
  const clearCacheStub = mockClearCache();

  const sut = new DbCreatePost(createPostRepositoryStub, clearCacheStub);

  return { sut, createPostRepositoryStub, clearCacheStub };
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

  it('should call ClearCache clear with correct value', async () => {
    const { sut, clearCacheStub } = makeSut();

    const cacheSpy = jest.spyOn(clearCacheStub, 'clear');

    const createPostParams = mockCreatePostParams();

    await sut.create(createPostParams);

    expect(cacheSpy).toHaveBeenCalledWith(`posts:${createPostParams.userId}`);
  });

  it('should throw if ClearCache throws', async () => {
    const { sut, clearCacheStub } = makeSut();

    jest
      .spyOn(clearCacheStub, 'clear')
      .mockReturnValueOnce(Promise.reject(new Error()));

    expect(sut.create(mockCreatePostParams())).rejects.toThrow();
  });

  it('should return a post model on success', async () => {
    const { sut } = makeSut();

    const response = await sut.create(mockCreatePostParams());

    expect(response).toEqual(mockPostModel());
  });
});
