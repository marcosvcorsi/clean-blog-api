import { ILoadUserIdByToken } from '@/domain/useCases/users/ILoadUserIdByToken';
import { AccessDeniedError } from '../errors/AccessDeniedError';
import { forbidden, ok } from '../helpers/http';
import { HttpRequest, HttpResponse } from '../protocols/Http';
import { IMiddleware } from '../protocols/IMiddleware';

export class AuthMiddleware implements IMiddleware {
  constructor(private readonly loadUserIdByToken: ILoadUserIdByToken) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.authorization;

    if (!accessToken) {
      return forbidden(new AccessDeniedError());
    }

    const [, token] = accessToken.split(' ');

    await this.loadUserIdByToken.loadUserId(token);

    return ok({ userId: 1 });
  }
}
