import { IClearCache } from '../protocols/cache/IClearCache';

export const mockClearCache = () => {
  class ClearCacheStub implements IClearCache {
    async clear(): Promise<void> {
      return Promise.resolve();
    }
  }

  return new ClearCacheStub();
};
