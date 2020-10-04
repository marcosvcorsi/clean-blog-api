import { CreateUser } from '@/domain/useCases/CreateUser';
import { serverError } from '@/presentation/helpers/http';
import { Controller } from '@/presentation/protocols/Controller';
import { HttpRequest, HttpResponse } from '@/presentation/protocols/Http';

export class CreateUserController implements Controller {
  constructor(private readonly createUser: CreateUser) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, name, password } = httpRequest.body;

      await this.createUser.create({ email, name, password });

      return {} as HttpResponse;
    } catch (error) {
      return serverError(error);
    }
  }
}
