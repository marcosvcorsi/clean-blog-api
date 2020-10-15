export interface ISaveCache {
  save(key: string, data: any): Promise<void>;
}
