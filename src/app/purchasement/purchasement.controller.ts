import { Get, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiOperation,
  ApiHeader,
} from '@nestjs/swagger';
import { ApiController } from '@util/api_controller';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { PurchasementReadAllResponse } from '@type/purchasement/purchasement.resp';
import { AuthHeader } from '@util/auth_header';

@ApiTags('purchasement')
@ApiController('purchasement')
export class PurchasementController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'read', description: 'Purchasement Read' })
  @ApiHeader(AuthHeader)
  @ApiBody({ type: PurchasementReadAllResponse })
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Get()
  async readAll(@Request() req): Promise<PurchasementReadAllResponse | void> {}
}
