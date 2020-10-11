import jwt from 'jsonwebtoken';
import { IEncrypter } from '@/data/protocols/crypto/IEncrypter';
import { IDecrypter } from '@/data/protocols/crypto/IDecrypter';

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: any): Promise<string> {
    const token = await jwt.sign({ userId: value }, this.secret);

    return token;
  }

  async decrypt(value: string): Promise<any> {
    try {
      const payload = await jwt.verify(value, this.secret);

      return payload;
    } catch (error) {
      return null;
    }
  }
}
