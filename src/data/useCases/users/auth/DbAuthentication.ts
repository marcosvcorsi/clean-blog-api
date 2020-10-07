import { IEncrypter } from '@/data/protocols/crypto/IEncrypter';
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
    private readonly encrypter: IEncrypter,
  ) {}

  async auth(
    data: AuthenticationParams,
  ): Promise<AuthenticationResponse | null> {
    const { email, password } = data;

    const user = await this.loadUserByEmailRepository.loadByEmail(email);

    if (user && (await this.hashComparer.compare(password, user.password))) {
      const { id, name } = user;

      const token = await this.encrypter.encrypt(id);

      return { email, name, token };
    }

    return null;
  }
}
