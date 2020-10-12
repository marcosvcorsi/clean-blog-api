import Redis from 'ioredis';

import { DbCreatePost } from '@/data/useCases/posts/create/DbCreatePost';
import { RedisAdapter } from '@/infra/cache/redisAdapter/RedisAdapter';
import { PostsRepository } from '@/infra/database/typeorm/repositories/PostsRepository';

import cacheConfig from '@/main/config/cache';

export const makeDbCreatePost = () => {
  const postsRepository = new PostsRepository();
  const redisAdapter = new RedisAdapter(new Redis(cacheConfig));

  return new DbCreatePost(postsRepository, redisAdapter);
};
