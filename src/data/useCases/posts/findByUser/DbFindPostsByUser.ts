import { ILoadCache } from '@/data/protocols/cache/ILoadCache';
import { PostModel } from '@/domain/models/Post';
import { IFindPostsByUser } from '@/domain/useCases/posts/IFindPostsByUser';

export class DbFindPostsByUser implements IFindPostsByUser {
  constructor(private readonly loadCache: ILoadCache) {}

  async findByUser(userId: number): Promise<PostModel[]> {
    const posts = await this.loadCache.load<PostModel[]>(`posts:${userId}`);

    return posts;
  }
}
