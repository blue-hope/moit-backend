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
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { ApiController } from '@util/api_controller';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { Restaurant } from './restaurant.entity';
import {
  RestaurantReadAllOrdersResponse,
  RestaurantReadAllResponse,
} from '@type/restaurant/restaurant.resp';
import { RestaurantService } from './restaurant.service';
import { serializeAll } from '@util/serialize';
import { restaurantConverter } from '@type/restaurant/restaurant.converter';
import {
  orderConverter,
  orderConverterForRestaurant,
} from '@type/order/order.converter';
import { OrderStep } from '@type/order/order.enum';

@ApiTags('restaurant')
@ApiController('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'readAll', description: 'Restaurant ReadAll' })
  @ApiBody({ type: RestaurantReadAllResponse })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Get()
  async readAll(
    @Query('searchKey') searchKey: string = '',
  ): Promise<RestaurantReadAllResponse> {
    const restaurants = await this.restaurantService.readAllByQuery(searchKey);
    return {
      restaurants: serializeAll(
        await Promise.all(
          restaurants.map((restaurant) => restaurantConverter(restaurant)),
        ),
      ),
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'readAll',
    description: 'Restaurant ReadAll Orders on me',
  })
  @ApiBody({ type: RestaurantReadAllOrdersResponse })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Get(':id/orders')
  async readAllOrders(
    @Param('id') restaurantId: number,
  ): Promise<RestaurantReadAllOrdersResponse> {
    const restaurant = await this.restaurantService.read(restaurantId);
    const orders = await restaurant.orders;
    return {
      orders: serializeAll(
        await Promise.all(
          orders.map((order) => orderConverterForRestaurant(order)),
        ),
      ),
      totalOrderCount: orders.length,
      readyOrderCount: orders.filter((order) => order.step == OrderStep.READY)
        .length,
      cookingOrderCount: orders.filter(
        (order) => order.step == OrderStep.COOKING,
      ).length,
      completedOrderCount: orders.filter(
        (order) => order.step == OrderStep.COMPLETED,
      ).length,
    };
  }
}
