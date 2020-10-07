import { UserModel } from '@/domain/models/User';

export interface ILoadUserByEmailRepository {
  loadByEmail(email: string): Promise<UserModel>;
}
