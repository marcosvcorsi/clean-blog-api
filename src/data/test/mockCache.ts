import { IClearCache } from '../protocols/cache/IClearCache';
import { ILoadCache } from '../protocols/cache/ILoadCache';

export const mockClearCache = () => {
  class ClearCacheStub implements IClearCache {
    async clear(): Promise<void> {
      return Promise.resolve();
    }
  }

  return new ClearCacheStub();
};

export const mockLoadCache = () => {
  class LoadCacheStub implements ILoadCache {
    async load(): Promise<any> {
      return null;
    }
  }

  return new LoadCacheStub();
};
