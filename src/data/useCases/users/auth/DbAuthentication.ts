import { ILoadUserByEmailRepository } from '@/data/protocols/database/users/ILoadUserByEmailRepository';
import {
  IAuthentication,
  AuthenticationParams,
  AuthenticationResponse,
} from '@/domain/useCases/IAuthentication';

export class DbAuthentication implements IAuthentication {
  constructor(
    private readonly loadUserByEmailRepository: ILoadUserByEmailRepository,
  ) {}

  async auth(data: AuthenticationParams): Promise<AuthenticationResponse> {
    const { email } = data;

    await this.loadUserByEmailRepository.loadByEmail(email);

    return {} as AuthenticationResponse;
  }
}
