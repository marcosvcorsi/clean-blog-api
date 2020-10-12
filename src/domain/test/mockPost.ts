import { mockPostModel } from '@/data/test';
import { PostModel } from '../models/Post';
import { ICreatePost } from '../useCases/posts/ICreatePost';

export const mockCreatePost = () => {
  class CreatePostStub implements ICreatePost {
    async create(): Promise<PostModel> {
      return mockPostModel();
    }
  }

  return new CreatePostStub();
};
