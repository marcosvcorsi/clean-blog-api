import { HttpRequest, HttpResponse } from './Http';

export interface IMiddleware {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
