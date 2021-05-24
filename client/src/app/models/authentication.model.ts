export interface SignInResponse {
  tokens: TokenResponse;
  email: string;
  password: string;
  id: number;
  name: string;
  surname: string;
  role: string;
}

export interface TokenResponse {
  accessToken: string;
  accessTokenExpiresIn: any;
  refreshToken: string;
}

export class UserModel {
  id: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  role: string;
  companyId: number;
}
