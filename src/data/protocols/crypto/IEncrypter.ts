export interface IEncrypter {
  encrypt(value: any): Promise<string>;
}
