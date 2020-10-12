import { adaptMiddleware } from '../adapters/middlewares';
import { makeAuthMiddleware } from '../factories/middlewares/authMiddleware';

export const auth = adaptMiddleware(makeAuthMiddleware());
