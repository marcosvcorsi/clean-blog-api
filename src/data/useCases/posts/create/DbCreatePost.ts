import { ICreatePostRepository } from '@/data/protocols/database/posts/ICreatePostRepository';
import { PostModel } from '@/domain/models/Post';
import {
  CreatePostParams,
  ICreatePost,
} from '@/domain/useCases/posts/ICreatePost';

export class DbCreatePost implements ICreatePost {
  constructor(private readonly createPostRepository: ICreatePostRepository) {}

  async create(data: CreatePostParams): Promise<PostModel> {
    const post = await this.createPostRepository.create(data);

    return post;
  }
}
