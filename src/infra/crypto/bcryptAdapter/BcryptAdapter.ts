import bcrypt from 'bcrypt';
import { IHasher } from '@/data/protocols/crypto/IHasher';
import { IHashComparer } from '@/data/protocols/crypto/IHashComparer';

export class BcryptAdapter implements IHasher, IHashComparer {
  constructor(private readonly salt: number) {}

  async generate(value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, this.salt);

    return hashedValue;
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const match = await bcrypt.compare(value, hash);

    return match;
  }
}
