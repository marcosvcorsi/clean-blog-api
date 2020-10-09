import { PostModel } from '@/domain/models/Post';
import { CreatePostParams } from '@/domain/useCases/posts/ICreatePost';

export interface ICreatePostRepository {
  create(data: CreatePostParams): Promise<PostModel>;
}
