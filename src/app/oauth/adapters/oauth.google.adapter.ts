import { HttpService, Injectable, UnauthorizedException } from '@nestjs/common';
import { SocialProviderUrl } from '@app/oauth/oauth.enum';
import { UrlQueryBuilder } from '@util/url_query_builder';
import {
  GoogleOAuthResponse,
  GoogleMeResponse,
  GoogleUserInfoResponse,
} from '@type/oauth/oauth.google.resp';
import { SecretsManagerSingleton } from '@config/secrets_manager/secrets_manager';
import { IOAuthAdapter } from './oauth.base.adapter';
import { OAuthLoginRequest } from '@type/oauth/oauth.req';

@Injectable()
export class OAuthGoogleAdapter implements IOAuthAdapter {
  authUrl: string = SocialProviderUrl.GOOGLE_AUTH;
  apiUrl: string = SocialProviderUrl.GOOGLE_API;

  constructor(private httpService: HttpService) {}

  async login(payload: OAuthLoginRequest): Promise<GoogleUserInfoResponse> {
    const {
      data,
    }: { data: GoogleOAuthResponse | undefined } = await this.httpService
      .post(
        UrlQueryBuilder(this.authUrl + '/token')
          .setMultipleQuery({
            code: payload.code,
            clientId: SecretsManagerSingleton.getValue('GOOGLE_OAUTH_ID'),
            clientSecret: SecretsManagerSingleton.getValue(
              'GOOGLE_OAUTH_SECRET',
            ),
            redirectUri: payload.redirectUri,
            grantType: 'authorization_code',
          })
          .build(),
      )
      .toPromise();

    return await this.me(data.id_token);
  }

  async me(token: string): Promise<GoogleUserInfoResponse> {
    const { data }: { data: GoogleMeResponse } = await this.httpService
      .get(
        UrlQueryBuilder(this.authUrl + '/tokeninfo')
          .setMultipleQuery({
            id_token: token,
          })
          .build(),
      )
      .toPromise();

    return data;
  }
}
