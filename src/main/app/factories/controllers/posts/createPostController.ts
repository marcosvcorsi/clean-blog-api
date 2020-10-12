import { CreatePostController } from '@/presentation/controllers/posts/createPost/CreatePostController';
import { makeDbCreatePost } from '../../useCases/posts/dbCreatePost';

export const makeCreatePostController = () => {
  const dbCreatePost = makeDbCreatePost();

  return new CreatePostController(dbCreatePost);
};
