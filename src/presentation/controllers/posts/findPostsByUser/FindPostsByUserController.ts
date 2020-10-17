import { IFindPostsByUser } from '@/domain/useCases/posts/IFindPostsByUser';
import { HttpRequest, HttpResponse } from '@/presentation/protocols/Http';
import { IController } from '@/presentation/protocols/IController';

export class FindPostsByUserController implements IController {
  constructor(private readonly findPostsByUser: IFindPostsByUser) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId } = httpRequest;

    await this.findPostsByUser.findByUser(Number(userId));

    return {} as HttpResponse;
  }
}
