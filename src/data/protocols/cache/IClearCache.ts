export interface IClearCache {
  clear(key: string): Promise<void>;
}
