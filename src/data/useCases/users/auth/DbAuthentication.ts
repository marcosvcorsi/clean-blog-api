import { IHasherComparer } from '@/data/protocols/crypto/IHasherComparer';
import { ILoadUserByEmailRepository } from '@/data/protocols/database/users/ILoadUserByEmailRepository';
import {
  IAuthentication,
  AuthenticationParams,
  AuthenticationResponse,
} from '@/domain/useCases/IAuthentication';

export class DbAuthentication implements IAuthentication {
  constructor(
    private readonly loadUserByEmailRepository: ILoadUserByEmailRepository,
    private readonly hashComparer: IHasherComparer,
  ) {}

  async auth(data: AuthenticationParams): Promise<AuthenticationResponse> {
    const { email, password } = data;

    const user = await this.loadUserByEmailRepository.loadByEmail(email);

    if (user && (await this.hashComparer.compare(password, user.password))) {
      return {} as AuthenticationResponse;
    }

    return {} as AuthenticationResponse;
  }
}
