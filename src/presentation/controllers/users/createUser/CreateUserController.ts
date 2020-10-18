import { ICreateUser } from '@/domain/useCases/users/ICreateUser';
import { badRequest, created, serverError } from '@/presentation/helpers/http';
import { IController } from '@/presentation/protocols/IController';
import { HttpRequest, HttpResponse } from '@/presentation/protocols/Http';
import { EmailInUseError } from '@/presentation/errors/EmailInUseError';

export class CreateUserController implements IController {
  constructor(private readonly createUser: ICreateUser) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, name, password } = httpRequest.body;

      const user = await this.createUser.create({ email, name, password });

      if (!user) {
        return badRequest(new EmailInUseError());
      }

      return created({ name: user.name, email: user.email });
    } catch (error) {
      return serverError(error);
    }
  }
}
