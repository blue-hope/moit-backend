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
import { Order } from './order.entity';

@ApiTags('order')
@ApiController('order')
export class OrderController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'read', description: 'Order Read' })
  @ApiBody({ type: [Order] })
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @Get()
  async readAll(@Request() req): Promise<Order[] | void> {}
}
