import bcrypt from 'bcrypt';
import { IHasher } from '@/data/protocols/crypto/IHasher';

export class BcryptAdapter implements IHasher {
  constructor(private readonly salt: number) {}

  async generate(value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, this.salt);

    return hashedValue;
  }
}
