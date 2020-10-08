import { IAuthentication } from '@/domain/useCases/IAuthentication';
import { ok, serverError } from '@/presentation/helpers/http';
import { HttpRequest, HttpResponse } from '@/presentation/protocols/Http';
import { IController } from '@/presentation/protocols/IController';

export class LoginController implements IController {
  constructor(private readonly authentication: IAuthentication) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;

      const authenticationResponse = await this.authentication.auth({
        email,
        password,
      });

      return ok(authenticationResponse);
    } catch (error) {
      return serverError(error);
    }
  }
}
