import { mockLoadCache } from '@/data/test';
import { DbFindPostsByUser } from './DbFindPostsByUser';

const makeSut = () => {
  const loadCacheStub = mockLoadCache();
  const sut = new DbFindPostsByUser(loadCacheStub);

  return { sut, loadCacheStub };
};

describe('DbFindPostsByUser Tests', () => {
  it('should call LoadCache with correct value', async () => {
    const { sut, loadCacheStub } = makeSut();

    const cacheSpy = jest.spyOn(loadCacheStub, 'load');

    await sut.findByUser(1);

    expect(cacheSpy).toHaveBeenCalledWith('posts:1');
  });
});
