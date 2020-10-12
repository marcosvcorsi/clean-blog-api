import { ICreatePost } from '@/domain/useCases/posts/ICreatePost';
import { created, serverError } from '@/presentation/helpers/http';
import { HttpRequest, HttpResponse } from '@/presentation/protocols/Http';
import { IController } from '@/presentation/protocols/IController';

export class CreatePostController implements IController {
  constructor(private readonly createPost: ICreatePost) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest;
      const { title, content } = httpRequest.body;

      const post = await this.createPost.create({
        userId: Number(userId),
        title,
        content,
        date: new Date(),
      });

      return created(post);
    } catch (error) {
      return serverError(error);
    }
  }
}
