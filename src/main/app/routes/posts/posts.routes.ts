import { Router } from 'express';
import { adaptRoute } from '../../adapters/routes';
import { makeCreatePostController } from '../../factories/controllers/posts/createPostController';
import { auth } from '../../middlewares/auth';

const postsRouter = Router();

postsRouter.post('/', auth, adaptRoute(makeCreatePostController()));
postsRouter.get('/', auth, (request, response) => response.send());

export default postsRouter;
