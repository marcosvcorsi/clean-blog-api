import { ILoadCache } from '@/data/protocols/cache/ILoadCache';
import { ISaveCache } from '@/data/protocols/cache/ISaveCache';
import { IFindPostsByUserRepository } from '@/data/protocols/database/posts/IFindPostsByUserRepository';
import { PostModel } from '@/domain/models/Post';
import { IFindPostsByUser } from '@/domain/useCases/posts/IFindPostsByUser';

export class DbFindPostsByUser implements IFindPostsByUser {
  constructor(
    private readonly loadCache: ILoadCache,
    private readonly findPostsByUserRepository: IFindPostsByUserRepository,
    private readonly saveCache: ISaveCache,
  ) {}

  async findByUser(userId: number): Promise<PostModel[]> {
    const cacheKey = `posts:${userId}`;
    let posts = await this.loadCache.load<PostModel[]>(cacheKey);

    if (!posts) {
      posts = await this.findPostsByUserRepository.findByUser(userId);

      await this.saveCache.save(cacheKey, posts);
    }

    return posts;
  }
}
