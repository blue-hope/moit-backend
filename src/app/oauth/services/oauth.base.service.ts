import { Injectable } from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { UserService } from '@app/user/user.service';
import { SocialProvider } from '@app/oauth/oauth.enum';
import { LoginResponse } from '@type/auth/auth.resp';
import { OAuthUserInfoResponse } from '@type/oauth/oauth.base.resp';
import { IOAuthBaseService } from '../adapters/oauth.base.adapter';

@Injectable()
export class OAuthBaseService implements IOAuthBaseService {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async baseLogin(
    payload: OAuthUserInfoResponse,
    provider: SocialProvider,
  ): Promise<LoginResponse> {
    const user =
      (await this.userService.readByEmail(payload.email)) ??
      (await this.userService.create({
        email: payload.email,
        name: payload.name || provider,
        phoneNumber: '', // TODO: Oauth phone number
        password: 'password',
        provider: provider,
      }));
    return {
      accessToken: await this.authService.login(user),
    };
  }
}
