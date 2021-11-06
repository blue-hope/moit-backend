import { Injectable } from '@nestjs/common';
import { OAuthBaseService } from '@app/oauth/services/oauth.base.service';
import { OAuthGoogleAdapter } from '@app/oauth/adapters/oauth.google.adapter';
import { AuthService } from '@app/auth/auth.service';
import { UserService } from '@app/user/user.service';
import { SocialProvider } from '@app/oauth/oauth.enum';
import { LoginResponse } from '@type/auth/auth.resp';
import { OAuthLoginRequest } from '@type/oauth/oauth.req';
import { IOAuthProviderService } from '../adapters/oauth.base.adapter';

@Injectable()
export class OAuthGoogleService
  extends OAuthBaseService
  implements IOAuthProviderService {
  provider = SocialProvider.GOOGLE;

  constructor(
    userService: UserService,
    authService: AuthService,
    private readonly oAuthGoogleAdapter: OAuthGoogleAdapter,
  ) {
    super(userService, authService);
  }

  async login(payload: OAuthLoginRequest): Promise<LoginResponse> {
    const data = await this.oAuthGoogleAdapter.login(payload);
    return await super.baseLogin(data, this.provider);
  }
}
