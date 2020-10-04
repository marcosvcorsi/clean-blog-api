import { CreateUser } from '@/domain/useCases/CreateUser';
import { created, serverError } from '@/presentation/helpers/http';
import { Controller } from '@/presentation/protocols/Controller';
import { HttpRequest, HttpResponse } from '@/presentation/protocols/Http';

export class CreateUserController implements Controller {
  constructor(private readonly createUser: CreateUser) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, name, password } = httpRequest.body;

      const user = await this.createUser.create({ email, name, password });

      return created({ name: user.name, email: user.email });
    } catch (error) {
      return serverError(error);
    }
  }
}
