import { Get, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiHeader,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { ApiController } from '@util/api_controller';
import {
  ReadResponse,
  ReadAllResponse,
} from '@type/university/university.resp';
import { AuthHeader } from '@util/auth_header';

@ApiTags('university')
@ApiController('university')
export class UniversityController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'read', description: 'University ReadAll' })
  @ApiHeader(AuthHeader)
  @ApiOkResponse({
    type: ReadAllResponse,
  })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Get()
  async readAll(): Promise<ReadAllResponse | void> {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'read', description: 'University Read (Me)' })
  @ApiHeader(AuthHeader)
  @ApiOkResponse({
    type: ReadResponse,
  })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Get('me')
  async read(): Promise<ReadResponse | void> {}
}
