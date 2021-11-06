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
import {
  ReadAllResponse,
  ReadResponse,
} from '@type/restaurant/restaurant.resp';

@ApiTags('restaurant')
@ApiController('restaurant')
export class RestaurantController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'create', description: 'Restaurant Create' })
  @ApiBody({ type: ReadResponse })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Request() req): Promise<ReadResponse | void> {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'readAll', description: 'Restaurant ReadAll' })
  @ApiBody({ type: ReadAllResponse })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Get()
  async readAll(
    @Query('searchKey') searchKey: string,
  ): Promise<ReadAllResponse[] | void> {}
}
