import { forwardRef, HttpModule, Module } from '@nestjs/common';
import { AuthModule } from '@app/auth/auth.module';
import { UserModule } from '@app/user/user.module';
import { OAuthGoogleService } from '@app/oauth/services/oauth.google.service';
import { OAuthGoogleAdapter } from '@app/oauth/adapters/oauth.google.adapter';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    HttpModule,
  ],
  exports: [OAuthGoogleService],
  controllers: [],
  providers: [OAuthGoogleService, OAuthGoogleAdapter],
})
export class OAuthModule {}
