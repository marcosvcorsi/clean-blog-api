export type AuthenticationParams = {
  email: string;
  password: string;
};

export type AuthenticationResponse = {
  name: string;
  email: string;
  token: string;
};

export interface IAuthentication {
  auth(data: AuthenticationParams): Promise<AuthenticationResponse | null>;
}
