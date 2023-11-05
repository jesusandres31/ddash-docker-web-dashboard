export interface AuthUser {
  uuid: string;
  accessToken: string;
  refreshToken: string;
  name: string;
}

export type RefreshTokenRes = Pick<AuthUser, "accessToken">;

export interface SignInReq {
  email: string;
  password: string;
  remember: boolean;
}

export interface Token {
  exp: number;
  sub: string;
}
