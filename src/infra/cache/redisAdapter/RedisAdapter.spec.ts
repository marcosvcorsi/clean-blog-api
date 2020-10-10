import Redis from 'ioredis';
import { RedisAdapter } from './RedisAdapter';

jest.mock('ioredis');

const makeSut = () => {
  const clientStub = new Redis();

  const sut = new RedisAdapter(clientStub);

  return { sut, clientStub };
};

describe('RedisAdapter Test', () => {
  it('should call RedisClient del with correct value', async () => {
    const { sut, clientStub } = makeSut();

    const clearSpy = jest.spyOn(clientStub, 'del');

    await sut.clear('anykey');

    expect(clearSpy).toHaveBeenCalledWith('anykey');
  });

  it('should throw if RedisClient del throws', async () => {
    const { sut, clientStub } = makeSut();

    jest
      .spyOn(clientStub, 'del')
      .mockReturnValueOnce(Promise.reject(new Error()));

    await expect(sut.clear('anykey')).rejects.toThrow();
  });
});
