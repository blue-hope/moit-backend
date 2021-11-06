import { Get, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiController } from '@util/api_controller';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { ReadAllResponse } from '@type/restaurant/restaurant.resp';

@ApiTags('order')
@ApiController('order')
export class OrderController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'read', description: 'Order Read' })
  @ApiOkResponse({ type: ReadAllResponse })
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Get()
  async readAll(
    @Query('sortBy') sortBy: 'latest' | 'remaining',
    @Query('categoryId') categoryId?: number,
  ): Promise<ReadAllResponse | void> {}
}
