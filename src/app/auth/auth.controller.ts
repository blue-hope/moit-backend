import { HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthService } from '@app/auth/auth.service';
import { LocalAuthGuard } from '@app/auth/guards/local-auth.guard';
import { LoginResponse } from '@type/auth/auth.resp';
import { ApiController } from '@util/api_controller';
import { RequestContext } from '@type/common/common.dto';
import { LoginRequest } from '@type/auth/auth.req';

@ApiTags('auth')
@ApiController('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
