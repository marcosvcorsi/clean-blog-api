import { CreateUserController } from '@/presentation/controllers/users/createUser/CreateUserController';
import { makeDbCreateUser } from '../../useCases/users/dbCreateUser';

export const makeCreateUserController = () => {
  const dbCreateUser = makeDbCreateUser();

  return new CreateUserController(dbCreateUser);
};
