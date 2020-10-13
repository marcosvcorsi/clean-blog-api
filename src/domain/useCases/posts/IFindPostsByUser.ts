import { PostModel } from '@/domain/models/Post';

export interface IFindPostsByUser {
  findByUser(userId: number): Promise<PostModel[]>;
}
