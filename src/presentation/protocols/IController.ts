import { HttpRequest, HttpResponse } from './Http';

export interface IController {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
