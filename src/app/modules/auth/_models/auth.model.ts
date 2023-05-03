export class AuthModel {
  authToken: string;
  refreshToken: string;
  expiresIn: Date;
  jwt: string;
  data: string;

  setAuth(auth: any) {
    this.authToken = auth.token;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
    this.jwt = auth.jwt;
    this.data = auth.token;
  }
}
