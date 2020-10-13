import { PostModel } from '@/domain/models/Post';
import { ICreatePostRepository } from '../protocols/database/posts/ICreatePostRepository';

export const mockCreatePostParams = () => ({
  title: 'anytitle',
  content: 'anycontent',
  userId: 1,
  date: new Date(),
});

export const mockPostModel = (): PostModel => ({
  id: 1,
  title: 'anytitle',
  content: 'anycontent',
  userId: 1,
  date: new Date(),
});

export const mockPostModelList = (): PostModel[] => [
  {
    id: 1,
    title: 'anytitle',
    content: 'anycontent',
    userId: 1,
    date: new Date(),
  },

  {
    id: 2,
    title: 'othertitle',
    content: 'othercontent',
    userId: 1,
    date: new Date(),
  },
];

export const mockCreatePostRepository = () => {
  class CreatePostRepositoryStub implements ICreatePostRepository {
    async create(): Promise<PostModel> {
      return mockPostModel();
    }
  }

  return new CreatePostRepositoryStub();
};
