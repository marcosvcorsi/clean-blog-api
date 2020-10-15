import MockDate from 'mockdate';
import {
  mockFindPostsByUserRepository,
  mockLoadCache,
  mockPostModelList,
  mockSaveCache,
} from '@/data/test';
import { DbFindPostsByUser } from './DbFindPostsByUser';

const makeSut = () => {
  const loadCacheStub = mockLoadCache();
  const findPostsByUserRepositoryStub = mockFindPostsByUserRepository();
  const saveCacheStub = mockSaveCache();

  const sut = new DbFindPostsByUser(
    loadCacheStub,
    findPostsByUserRepositoryStub,
    saveCacheStub,
  );

  return { sut, loadCacheStub, findPostsByUserRepositoryStub, saveCacheStub };
};

describe('DbFindPostsByUser Tests', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should call LoadCache with correct value', async () => {
    const { sut, loadCacheStub } = makeSut();

    const cacheSpy = jest.spyOn(loadCacheStub, 'load');

    await sut.findByUser(1);

    expect(cacheSpy).toHaveBeenCalledWith('posts:1');
  });

  it('should throw if LoadCache throws', async () => {
    const { sut, loadCacheStub } = makeSut();

    jest
      .spyOn(loadCacheStub, 'load')
      .mockReturnValueOnce(Promise.reject(new Error()));

    await expect(sut.findByUser(1)).rejects.toThrow();
  });

  it('should return posts if LoadCache returns posts', async () => {
    const { sut, loadCacheStub } = makeSut();

    jest
      .spyOn(loadCacheStub, 'load')
      .mockReturnValueOnce(Promise.resolve(mockPostModelList()));

    const response = await sut.findByUser(1);

    expect(response).toEqual(mockPostModelList());
  });

  it('should call FindPostsByUserRepository with correct value', async () => {
    const { sut, findPostsByUserRepositoryStub } = makeSut();

    const repositorySpy = jest.spyOn(
      findPostsByUserRepositoryStub,
      'findByUser',
    );

    await sut.findByUser(1);

    expect(repositorySpy).toHaveBeenCalledWith(1);
  });

  it('should throw if FindPostsByUserRepository throws', async () => {
    const { sut, findPostsByUserRepositoryStub } = makeSut();

    jest
      .spyOn(findPostsByUserRepositoryStub, 'findByUser')
      .mockReturnValueOnce(Promise.reject(new Error()));

    await expect(sut.findByUser(1)).rejects.toThrow();
  });

  it('should return posts if FindPostsByUserRepository return posts', async () => {
    const { sut } = makeSut();

    const response = await sut.findByUser(1);

    expect(response).toEqual(mockPostModelList());
  });

  it('should call SaveCache with correct values', async () => {
    const { sut, saveCacheStub } = makeSut();

    const saveCacheSpy = jest.spyOn(saveCacheStub, 'save');

    await sut.findByUser(1);

    expect(saveCacheSpy).toHaveBeenCalledWith('posts:1', mockPostModelList());
  });

  it('should throw if SaveCache throws', async () => {
    const { sut, saveCacheStub } = makeSut();

    jest
      .spyOn(saveCacheStub, 'save')
      .mockReturnValueOnce(Promise.reject(new Error()));

    await expect(sut.findByUser(1)).rejects.toThrow();
  });
});
