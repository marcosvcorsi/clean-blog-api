export interface Hasher {
  generate(value: string): Promise<string>;
}
