import { mockPostModel, mockPostModelList } from '@/data/test';
import { PostModel } from '../models/Post';
import { ICreatePost } from '../useCases/posts/ICreatePost';
import { IFindPostsByUser } from '../useCases/posts/IFindPostsByUser';

export const mockCreatePost = () => {
  class CreatePostStub implements ICreatePost {
    async create(): Promise<PostModel> {
      return mockPostModel();
    }
  }

  return new CreatePostStub();
};

export const mockFindPostsByUser = () => {
  class FindPostsByUserStub implements IFindPostsByUser {
    async findByUser(): Promise<PostModel[]> {
      return mockPostModelList();
    }
  }

  return new FindPostsByUserStub();
};
