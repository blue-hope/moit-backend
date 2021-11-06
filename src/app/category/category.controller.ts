import { Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiOperation,
  ApiHeader,
} from '@nestjs/swagger';
import { ApiController } from '@util/api_controller';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { CategoryReadAllResponse } from '@type/category/category.resp';
import { AuthHeader } from '@util/auth_header';
import { CategoryService } from './category.service';
import { serialize } from '@util/serialize';

@ApiTags('category')
@ApiController('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'readAll', description: 'Category ReadAll' })
  @ApiHeader(AuthHeader)
  @ApiOkResponse({ type: CategoryReadAllResponse })
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Get()
  async readAll(): Promise<CategoryReadAllResponse> {
    return {
      categories: serialize(await this.categoryService.readAll()),
    };
  }
}
