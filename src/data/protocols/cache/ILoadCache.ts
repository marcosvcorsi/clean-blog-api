export interface ILoadCache {
  load<T>(key: string): Promise<T>;
}
