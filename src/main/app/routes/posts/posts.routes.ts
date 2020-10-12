import { Router } from 'express';

const postsRouter = Router();

postsRouter.post('/', (req, res) => res.status(403).send());

export default postsRouter;
