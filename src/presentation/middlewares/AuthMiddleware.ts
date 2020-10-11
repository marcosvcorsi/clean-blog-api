import { AccessDeniedError } from '../errors/AccessDeniedError';
import { forbidden, ok } from '../helpers/http';
import { HttpRequest, HttpResponse } from '../protocols/Http';
import { IMiddleware } from '../protocols/IMiddleware';

export class AuthMiddleware implements IMiddleware {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.authorization;

    if (!accessToken) {
      return forbidden(new AccessDeniedError());
    }

    return ok({ userId: 1 });
  }
}
