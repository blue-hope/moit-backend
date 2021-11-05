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
import { UserWithoutAuth } from '@app/user/user.entity';
import { Loginresponse } from '@type/auth/auth.resp';
import { ApiController } from '@util/api_controller';
import { RequestContext } from '@type/common/common.dto';

@ApiTags('auth')
@ApiController('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'login', description: 'User Login' })
  @ApiBody({ type: UserWithoutAuth })
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @Post('login')
  async login(@Request() req: RequestContext): Promise<Loginresponse> {
    return this.authService.login(req.user);
  }
}
