import { Router } from 'express';

import loginRouter from './login/login.routes';
import usersRouter from './users/users.routes';

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/users', usersRouter);

export default routes;
