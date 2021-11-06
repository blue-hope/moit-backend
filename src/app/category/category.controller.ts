import { Get, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiController } from '@util/api_controller';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { ReadAllResponse } from '@type/category/category.resp';

@ApiTags('category')
@ApiController('category')
export class CategoryController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'read', description: 'Category Read' })
  @ApiBody({ type: ReadAllResponse })
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Get()
  async readAll(@Request() req): Promise<ReadAllResponse | void> {}
}
