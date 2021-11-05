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
  @ApiOperation({ summary: 'create', description: 'Restaurant Create' })
  @ApiBody({ type: Restaurant })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Request() req): Promise<Restaurant | void> {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'readAll', description: 'Restaurant Read' })
  @ApiBody({ type: [Restaurant] })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Get()
  async readAll(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @Query('categoryId') categoryId: number,
  ): Promise<Restaurant[] | void> {}
}
