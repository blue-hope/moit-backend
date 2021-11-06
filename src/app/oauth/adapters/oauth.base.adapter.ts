import { SocialProvider, SocialProviderValues } from '@app/oauth/oauth.enum';
import { OAuthLoginRequest } from '@type/oauth/oauth.req';
import { OAuthUserInfoResponse } from '@type/oauth/oauth.base.resp';

export interface IOAuthBaseService {
  baseLogin(payload: OAuthUserInfoResponse, provider: SocialProviderValues);
}

export interface IOAuthProviderService extends IOAuthBaseService {
  provider: SocialProvider;
  login(payload: OAuthLoginRequest);
}

export interface IOAuthAdapter {
  authUrl: string;
  apiUrl: string;

  login(payload: OAuthLoginRequest);
  me(token: string);
}
