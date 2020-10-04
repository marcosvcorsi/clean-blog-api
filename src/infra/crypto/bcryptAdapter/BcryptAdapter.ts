import bcrypt from 'bcrypt';
import { Hasher } from '@/data/protocols/crypto/Hasher';

export class BcryptAdapter implements Hasher {
  constructor(private readonly salt: number) {}

  async generate(value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, this.salt);

    return hashedValue;
  }
}
