import { Get, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiOperation,
  ApiHeader,
} from '@nestjs/swagger';
import { ApiController } from '@util/api_controller';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { CategoryReadAllResponse } from '@type/category/category.resp';
import { AuthHeader } from '@util/auth_header';
import { CategoryService } from './category.service';

@ApiTags('category')
@ApiController('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'read', description: 'Category Read' })
  @ApiHeader(AuthHeader)
  @ApiBody({ type: CategoryReadAllResponse })
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Get()
  async readAll(): Promise<CategoryReadAllResponse> {
    return {
      categories: await this.categoryService.readAll(),
    };
  }
}
