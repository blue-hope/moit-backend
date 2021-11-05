import {
  Body,
  Get,
  HttpCode,
  HttpStatus,
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
import { CreateRestaurantDto } from '@type/restaurant/restaurant.dto';

@ApiTags('restaurant')
@ApiController('restaurant')
export class RestaurantController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'create', description: 'Restaurant Create' })
  @ApiBody({ type: Restaurant })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @Post()
  async create(@Request() req): Promise<Restaurant | void> {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'read', description: 'Restaurant Read' })
  @ApiBody({ type: [Restaurant] })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @Get()
  async readAll(
    @Body() CreateRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant[] | void> {}
}
