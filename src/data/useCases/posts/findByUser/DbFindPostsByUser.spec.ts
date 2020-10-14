import MockDate from 'mockdate';
import {
  mockFindPostsByUserRepository,
  mockLoadCache,
  mockPostModelList,
} from '@/data/test';
import { DbFindPostsByUser } from './DbFindPostsByUser';

const makeSut = () => {
  const loadCacheStub = mockLoadCache();
  const findPostsByUserRepositoryStub = mockFindPostsByUserRepository();

  const sut = new DbFindPostsByUser(
    loadCacheStub,
    findPostsByUserRepositoryStub,
  );

  return { sut, loadCacheStub, findPostsByUserRepositoryStub };
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
});
