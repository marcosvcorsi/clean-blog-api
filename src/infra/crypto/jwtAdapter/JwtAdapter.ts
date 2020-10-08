import jwt from 'jsonwebtoken';
import { IEncrypter } from '@/data/protocols/crypto/IEncrypter';

export class JwtAdapter implements IEncrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: any): Promise<string> {
    const token = await jwt.sign({ id: value }, this.secret);

    return token;
  }
}
