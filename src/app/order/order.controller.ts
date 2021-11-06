import {
  Body,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
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
  ApiQuery,
} from '@nestjs/swagger';
import { ApiController } from '@util/api_controller';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { OrderReadAllResponse } from '@type/order/order.resp';
import { OrderCreateResponse, OrderReadResponse } from '@type/order/order.resp';
import { OrderCreateRequest } from '@type/order/order.req';
import { AuthHeader } from '@util/auth_header';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { orderConverter } from '@type/order/order.converter';
import { serialize, serializeAll } from '@util/serialize';
import { RequestContext } from '@type/common/common.dto';
import { OrderStep } from '@type/order/order.enum';

@ApiTags('order')
@ApiController('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'create', description: 'Order Create' })
  @ApiHeader(AuthHeader)
  @ApiBody({ type: OrderCreateRequest })
  @ApiCreatedResponse({ type: OrderCreateResponse })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Request() req: RequestContext,
    @Body() orderCreateRequest: OrderCreateRequest,
  ): Promise<OrderCreateResponse> {
    return {
      id: (await this.orderService.create(req.user, orderCreateRequest)).id,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'readAll', description: 'Order ReadAll' })
  @ApiHeader(AuthHeader)
  @ApiQuery({
    name: 'sortBy',
    required: true,
    description: 'latest | remaining',
  })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    description: 'query by categoryId',
  })
  @ApiQuery({
    name: 'searchKey',
    required: true,
    description: 'query by searchKey (blank if not exist)',
  })
  @ApiOkResponse({ type: OrderReadAllResponse })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Get()
  async readAll(
    @Query('sortBy') sortBy: 'latest' | 'remaining',
    @Query('categoryId') categoryId: string | undefined,
    @Query('searchKey') searchKey: string,
  ): Promise<OrderReadAllResponse> {
    const orders = await this.orderService.readAllByQuery(
      parseInt(categoryId),
      searchKey,
    );
    return {
      orders: serializeAll(
        await Promise.all(orders.map((order) => orderConverter(order))),
      ),
    };
  }

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
    @Request() req: RequestContext,
    @Param('id') id: number,
  ): Promise<OrderReadResponse> {
    const order = await this.orderService.join(req.user, id);
    if ((await order.participants).length >= order.maxParticipants) {
      order.step = OrderStep.READY;
      await order.save();
    }
    return serialize(orderConverter(order));
  }
}
