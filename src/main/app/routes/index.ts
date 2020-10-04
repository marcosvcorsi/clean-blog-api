import { Router } from 'express';

import usersRouter from './users/users.routes';

const routes = Router();

routes.use('/users', usersRouter);

export default routes;
