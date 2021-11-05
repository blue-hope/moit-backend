import {
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
import { ApiController } from '@util/api_controller';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { Menu } from './menu.entity';

@ApiTags('menu')
@ApiController('menu')
export class MenuController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'read', description: 'Menu Read' })
  @ApiBody({ type: [Menu] })
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @Get()
  async readAll(@Request() req): Promise<Menu[] | void> {}
}
