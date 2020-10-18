import { Router } from 'express';
import { adaptRoute } from '../../adapters/routes';
import { makeCreatePostController } from '../../factories/controllers/posts/createPostController';
import { makeFindPostsByUserController } from '../../factories/controllers/posts/findPostsByUserController';
import { auth } from '../../middlewares/auth';

const postsRouter = Router();

postsRouter.post('/', auth, adaptRoute(makeCreatePostController()));
postsRouter.get('/', auth, adaptRoute(makeFindPostsByUserController()));

export default postsRouter;
