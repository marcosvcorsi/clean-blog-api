import { HttpRequest, HttpResponse } from './Http';

export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
