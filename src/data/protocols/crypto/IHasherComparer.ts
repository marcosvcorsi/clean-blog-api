export interface IHasherComparer {
  compare(value: string, hash: string): Promise<boolean>;
}
