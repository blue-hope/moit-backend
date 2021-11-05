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
} from '@nestjs/swagger';
import { AuthService } from '@app/auth/auth.service';
import { LocalAuthGuard } from '@app/auth/guards/local-auth.guard';
import { UserWithoutAuth } from '@app/user/user.entity';
import { loginResponse } from '@type/auth/auth.resp';
import { APIController } from '@util/api_controller';

@ApiTags('auth')
@APIController('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'login', description: '유저 로그인 (로컬)' })
  @ApiBody({ type: UserWithoutAuth })
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @Post('login')
  async login(@Request() req): Promise<loginResponse> {
    return this.authService.login(req.user);
  }
}
