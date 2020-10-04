import { Router } from 'express';
import { adaptRoute } from '../../adapters/routes';
import { makeCreateUserController } from '../../factories/controllers/users/createUserController';

const usersRouter = Router();

const createUserController = makeCreateUserController();

usersRouter.post('/', adaptRoute(createUserController));

export default usersRouter;
