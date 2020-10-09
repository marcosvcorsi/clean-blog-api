import { PostModel } from '@/domain/models/Post';

export type CreatePostParams = {
  title: string;
  content: string;
  userId: number;
  date: Date;
};

export interface ICreatePost {
  create(data: CreatePostParams): Promise<PostModel>;
}
