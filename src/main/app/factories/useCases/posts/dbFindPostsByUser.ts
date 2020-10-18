import Redis from 'ioredis';

import { DbFindPostsByUser } from '@/data/useCases/posts/findByUser/DbFindPostsByUser';
import { RedisAdapter } from '@/infra/cache/redisAdapter/RedisAdapter';
import { PostsRepository } from '@/infra/database/typeorm/repositories/PostsRepository';

import cacheConfig from '@/main/config/cache';

export const makeDbFindPostsByUser = () => {
  const redisAdapter = new RedisAdapter(new Redis(cacheConfig));
  const postsRepository = new PostsRepository();

  return new DbFindPostsByUser(redisAdapter, postsRepository, redisAdapter);
};
