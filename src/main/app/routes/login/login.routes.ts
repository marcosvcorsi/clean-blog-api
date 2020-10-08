import { Router } from 'express';
import { adaptRoute } from '../../adapters/routes';
import { makeLoginController } from '../../factories/controllers/users/loginController';

const loginRouter = Router();

const loginController = makeLoginController();

loginRouter.post('/', adaptRoute(loginController));

export default loginRouter;
