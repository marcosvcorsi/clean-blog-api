import { Redis as RedisClient } from 'ioredis';
import { IClearCache } from '@/data/protocols/cache/IClearCache';
import { ISaveCache } from '@/data/protocols/cache/ISaveCache';

export class RedisAdapter implements IClearCache, ISaveCache {
  constructor(private readonly client: RedisClient) {}

  async clear(key: string): Promise<void> {
    await this.client.del(key);
  }

  async save(key: string, data: any): Promise<void> {
    await this.client.set(key, JSON.stringify(data));
  }
}
