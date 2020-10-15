import Redis from 'ioredis';
import { RedisAdapter } from './RedisAdapter';

jest.mock('ioredis');

const makeSut = () => {
  const clientStub = new Redis();

  const sut = new RedisAdapter(clientStub);

  return { sut, clientStub };
};

describe('RedisAdapter Test', () => {
  describe('clear()', () => {
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

  describe('save()', () => {
    it('should call RedisClient set with correct values', async () => {
      const { sut, clientStub } = makeSut();

      const setSpy = jest.spyOn(clientStub, 'set');

      const data = { id: 1, value: 'anyvalue' };

      await sut.save('anykey', data);

      expect(setSpy).toHaveBeenCalledWith('anykey', JSON.stringify(data));
    });

    it('should throw if RedisClient set throws', async () => {
      const { sut, clientStub } = makeSut();

      jest
        .spyOn(clientStub, 'set')
        .mockImplementationOnce(() => Promise.reject(new Error()));

      const data = { id: 1, value: 'anyvalue' };

      await expect(sut.save('anykey', data)).rejects.toThrow();
    });
  });

  describe('load()', () => {
    it('should call RedisClient get with correct value', async () => {
      const { sut, clientStub } = makeSut();

      const getSpy = jest.spyOn(clientStub, 'get');

      await sut.load('anykey');

      expect(getSpy).toHaveBeenCalledWith('anykey');
    });

    it('should throw if RedisClient get throws', async () => {
      const { sut, clientStub } = makeSut();

      jest
        .spyOn(clientStub, 'get')
        .mockReturnValueOnce(Promise.reject(new Error()));

      await expect(sut.load('anykey')).rejects.toThrow();
    });

    it('should return null if RedisClient returns null', async () => {
      const { sut, clientStub } = makeSut();

      jest.spyOn(clientStub, 'get').mockReturnValueOnce(Promise.resolve(null));

      const response = await sut.load('anykey');

      expect(response).toBeNull();
    });

    it('should return parsed object on success', async () => {
      const { sut, clientStub } = makeSut();

      const data = { value: 'anycontent' };

      jest
        .spyOn(clientStub, 'get')
        .mockReturnValueOnce(Promise.resolve(JSON.stringify(data)));

      const response = await sut.load('anykey');

      expect(response).toEqual(data);
    });
  });
});
