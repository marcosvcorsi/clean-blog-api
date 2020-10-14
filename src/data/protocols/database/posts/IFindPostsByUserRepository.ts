import { PostModel } from '@/domain/models/Post';

export interface IFindPostsByUserRepository {
  findByUser(userId: number): Promise<PostModel[]>;
}
