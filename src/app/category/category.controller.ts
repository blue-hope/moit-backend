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
import { Category } from './category.entity';

@ApiTags('category')
@ApiController('category')
export class CategoryController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'read', description: 'Category Read' })
  @ApiBody({ type: [Category] })
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @Get()
  async readAll(@Request() req): Promise<Category[] | void> {}
}
