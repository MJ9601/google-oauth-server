export interface GoogleOAuth2TokenResults {
  id_token: string;
  scope: string;
  refresh_token: string;
  access_token: string;
  expires_in: number;
}

export interface GoogleOAuthTokenDecoded {
  email: string;
  name: string;
  locale: string;
  email_verified: boolean;
  picture: string;
  iat: Date;
  exp: Date;
}
