import { AuthMiddleware } from '@/presentation/middlewares/AuthMiddleware';
import { IMiddleware } from '@/presentation/protocols/IMiddleware';
import { makeDecryptUserIdByToken } from '../useCases/users/decryptUserIdByToken';

export const makeAuthMiddleware = (): IMiddleware => {
  const decryptUserIdByToken = makeDecryptUserIdByToken();

  return new AuthMiddleware(decryptUserIdByToken);
};
