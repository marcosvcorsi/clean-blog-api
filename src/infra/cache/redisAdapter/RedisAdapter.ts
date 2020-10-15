import { Redis as RedisClient } from 'ioredis';
import { IClearCache } from '@/data/protocols/cache/IClearCache';
import { ISaveCache } from '@/data/protocols/cache/ISaveCache';
import { ILoadCache } from '@/data/protocols/cache/ILoadCache';

export class RedisAdapter implements IClearCache, ISaveCache, ILoadCache {
  constructor(private readonly client: RedisClient) {}

  async clear(key: string): Promise<void> {
    await this.client.del(key);
  }

  async save(key: string, data: any): Promise<void> {
    await this.client.set(key, JSON.stringify(data));
  }

  async load<T>(key: string): Promise<T> {
    await this.client.get(key);

    return {} as T;
  }
}
