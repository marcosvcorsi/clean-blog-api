import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { adaptRoute } from '../../adapters/routes';
import { makeCreateUserController } from '../../factories/controllers/users/createUserController';

const usersRouter = Router();

const createUserController = makeCreateUserController();

usersRouter.post(
  '/',
  celebrate({
    body: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  adaptRoute(createUserController),
);

export default usersRouter;
