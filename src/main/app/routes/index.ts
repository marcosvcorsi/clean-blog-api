import { Router } from 'express';

import loginRouter from './login/login.routes';
import postsRouter from './posts/posts.routes';
import usersRouter from './users/users.routes';

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/users', usersRouter);
routes.use('/posts', postsRouter);

export default routes;
