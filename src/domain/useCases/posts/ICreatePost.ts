import { PostModel } from '@/domain/models/Post';

type CreatePostParams = {
  title: string;
  content: string;
  userId: number;
};

export interface ICreatePost {
  create(data: CreatePostParams): Promise<PostModel>;
}
