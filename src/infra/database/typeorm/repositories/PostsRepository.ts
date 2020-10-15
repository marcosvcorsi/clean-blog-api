import { ICreatePostRepository } from '@/data/protocols/database/posts/ICreatePostRepository';
import { IFindPostsByUserRepository } from '@/data/protocols/database/posts/IFindPostsByUserRepository';
import { CreatePostParams } from '@/domain/useCases/posts/ICreatePost';
import { getRepository, Repository } from 'typeorm';
import { Post } from '../entities/Post';

export class PostsRepository
  implements ICreatePostRepository, IFindPostsByUserRepository {
  private readonly postsRepository: Repository<Post>;

  constructor() {
    this.postsRepository = getRepository(Post);
  }

  async create(data: CreatePostParams): Promise<Post> {
    const post = this.postsRepository.create(data);

    await this.postsRepository.save(post);

    return post;
  }

  async findByUser(userId: number): Promise<Post[]> {
    const posts = await this.postsRepository.find({
      where: {
        userId,
      },
    });

    return posts;
  }
}
