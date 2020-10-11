import { IDecrypter } from '@/data/protocols/crypto/IDecrypter';
import { ILoadUserIdByToken } from '@/domain/useCases/users/ILoadUserIdByToken';

export class DecryptUserIdByToken implements ILoadUserIdByToken {
  constructor(private readonly decrypter: IDecrypter) {}

  async loadUserId(token: string): Promise<number | null> {
    const payload = await this.decrypter.decrypt(token);

    return payload ? payload.userId : null;
  }
}
