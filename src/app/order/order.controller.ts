import {
  Body,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiHeader,
} from '@nestjs/swagger';
import { ApiController } from '@util/api_controller';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { OrderReadAllResponse } from '@type/order/order.resp';
import { OrderCreateResponse, OrderReadResponse } from '@type/order/order.resp';
import { OrderJoinRequest } from '@type/order/order.req';
import { AuthHeader } from '@util/auth_header';

@ApiTags('order')
@ApiController('order')
export class OrderController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'create', description: 'Order Create' })
  @ApiHeader(AuthHeader)
  @ApiCreatedResponse({ type: OrderCreateResponse })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() OrderCreateRequest,
  ): Promise<OrderCreateResponse | void> {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'read', description: 'Order Read' })
  @ApiHeader(AuthHeader)
  @ApiOkResponse({ type: OrderReadAllResponse })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Get()
  async readAll(
    @Query('sortBy') sortBy: 'latest' | 'remaining',
    @Query('categoryId') categoryId?: number,
  ): Promise<OrderReadAllResponse | void> {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'read', description: 'Order Read' })
  @ApiHeader(AuthHeader)
  @ApiOkResponse({ type: OrderReadResponse })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async read(@Param('id') id: number): Promise<OrderReadResponse | void> {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'join', description: 'Order join as participant' })
  @ApiHeader(AuthHeader)
  @ApiOkResponse({ type: OrderReadResponse })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Post(':id/join')
  async join(
    @Param('id') id: number,
    @Body() OrderJoinRequest,
  ): Promise<OrderReadResponse | void> {}
}
