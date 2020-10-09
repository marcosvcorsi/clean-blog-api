import { IAuthentication } from '@/domain/useCases/users/IAuthentication';
import { ok, serverError, unauthorized } from '@/presentation/helpers/http';
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

      if (!authenticationResponse) {
        return unauthorized();
      }

      return ok(authenticationResponse);
    } catch (error) {
      return serverError(error);
    }
  }
}
