import { LoginController } from '@/presentation/controllers/users/login/LoginController';
import { makeDbAuthentication } from '../../useCases/users/dbAuthentication';

export const makeLoginController = () => {
  const dbAuthentication = makeDbAuthentication();

  return new LoginController(dbAuthentication);
};
