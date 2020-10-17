import { IFindPostsByUser } from '@/domain/useCases/posts/IFindPostsByUser';
import { ok, serverError } from '@/presentation/helpers/http';
import { HttpRequest, HttpResponse } from '@/presentation/protocols/Http';
import { IController } from '@/presentation/protocols/IController';

export class FindPostsByUserController implements IController {
  constructor(private readonly findPostsByUser: IFindPostsByUser) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest;

      const posts = await this.findPostsByUser.findByUser(Number(userId));

      return ok(posts);
    } catch (error) {
      return serverError(error);
    }
  }
}
