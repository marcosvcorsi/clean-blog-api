import { ILoadCache } from '@/data/protocols/cache/ILoadCache';
import { PostModel } from '@/domain/models/Post';
import { IFindPostsByUser } from '@/domain/useCases/posts/IFindPostsByUser';

export class DbFindPostsByUser implements IFindPostsByUser {
  constructor(private readonly loadCache: ILoadCache) {}

  async findByUser(userId: number): Promise<PostModel[]> {
    await this.loadCache.load<PostModel[]>(`posts:${userId}`);

    console.log(userId);

    return [];
  }
}
