import { Redis as RedisClient } from 'ioredis';
import { IClearCache } from '@/data/protocols/cache/IClearCache';

export class RedisAdapter implements IClearCache {
  constructor(private readonly client: RedisClient) {}

  async clear(key: string): Promise<void> {
    await this.client.del(key);
  }
}
