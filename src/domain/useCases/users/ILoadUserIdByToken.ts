export interface ILoadUserIdByToken {
  loadUserId(token: string): Promise<number | null>;
}
