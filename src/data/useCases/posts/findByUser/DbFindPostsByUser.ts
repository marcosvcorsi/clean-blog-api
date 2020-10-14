import { ILoadCache } from '@/data/protocols/cache/ILoadCache';
import { IFindPostsByUserRepository } from '@/data/protocols/database/posts/IFindPostsByUserRepository';
import { PostModel } from '@/domain/models/Post';
import { IFindPostsByUser } from '@/domain/useCases/posts/IFindPostsByUser';

export class DbFindPostsByUser implements IFindPostsByUser {
  constructor(
    private readonly loadCache: ILoadCache,
    private readonly findPostsByUserRepository: IFindPostsByUserRepository,
  ) {}

  async findByUser(userId: number): Promise<PostModel[]> {
    let posts = await this.loadCache.load<PostModel[]>(`posts:${userId}`);

    if (!posts) {
      posts = await this.findPostsByUserRepository.findByUser(userId);
    }

    return posts;
  }
}
