import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { adaptRoute } from '../../adapters/routes';
import { makeLoginController } from '../../factories/controllers/users/loginController';

const loginRouter = Router();

const loginController = makeLoginController();

loginRouter.post(
  '/',
  celebrate({
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  adaptRoute(loginController),
);

export default loginRouter;
