export interface IHasher {
  generate(value: string): Promise<string>;
}
