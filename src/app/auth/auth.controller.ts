import {
  BadRequestException,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiOperation,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AuthService } from '@app/auth/auth.service';
import { LocalAuthGuard } from '@app/auth/guards/local-auth.guard';
import { LoginResponse } from '@type/auth/auth.resp';
import { ApiController } from '@util/api_controller';
import { RequestContext } from '@type/common/common.dto';
import { LoginRequest } from '@type/auth/auth.req';
import { SocialProvider } from '@app/oauth/oauth.enum';
import { OAuthLoginRequest } from '@type/oauth/oauth.req';
import { OAuthGoogleService } from '@app/oauth/services/oauth.google.service';

@ApiTags('auth')
@ApiController('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly oAuthGoogleService: OAuthGoogleService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'login', description: 'User Login' })
  @ApiBody({ type: LoginRequest })
  @ApiOkResponse({ type: LoginResponse })
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Request() req: RequestContext): LoginResponse {
    return {
      accessToken: this.authService.login(req.user),
    };
  }

  @ApiOperation({ summary: 'login', description: 'User Social Login' })
  @ApiBody({ type: OAuthLoginRequest })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.OK)
  @Post('login/social/:provider')
  async oAuthLogin(
    @Param('provider') provider: string,
    @Body() body: OAuthLoginRequest,
  ) {
    try {
      switch (provider) {
        case SocialProvider.GOOGLE:
          return await this.oAuthGoogleService.login(body);
      }
    } catch (e) {
      throw new BadRequestException(e.response?.data?.error_description);
    }
  }
}
