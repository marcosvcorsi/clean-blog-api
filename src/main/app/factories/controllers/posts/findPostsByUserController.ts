import { FindPostsByUserController } from '@/presentation/controllers/posts/findPostsByUser/FindPostsByUserController';
import { makeDbFindPostsByUser } from '../../useCases/posts/dbFindPostsByUser';

export const makeFindPostsByUserController = () => {
  const dbFindPostsByUser = makeDbFindPostsByUser();

  return new FindPostsByUserController(dbFindPostsByUser);
};
