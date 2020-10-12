import { Router } from 'express';
import { adaptRoute } from '../../adapters/routes';
import { makeCreatePostController } from '../../factories/controllers/posts/createPostController';
import { auth } from '../../middlewares/auth';

const postsRouter = Router();

postsRouter.post('/', auth, adaptRoute(makeCreatePostController()));

export default postsRouter;
