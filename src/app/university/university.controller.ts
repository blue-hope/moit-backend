import { Get, UseGuards, HttpCode, HttpStatus, Request } from '@nestjs/common';
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
  UniversityReadResponse,
  UniversityReadAllResponse,
} from '@type/university/university.resp';
import { AuthHeader } from '@util/auth_header';
import { UniversityService } from './university.service';
import { RequestContext } from '@type/common/common.dto';

@ApiTags('university')
@ApiController('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @ApiOperation({ summary: 'read', description: 'University ReadAll' })
  @ApiHeader(AuthHeader)
  @ApiOkResponse({
    type: UniversityReadAllResponse,
  })
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.OK)
  @Get()
  async readAll(): Promise<UniversityReadAllResponse> {
    return {
      universities: await this.universityService.readAll(),
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'read', description: 'University Read (Me)' })
  @ApiHeader(AuthHeader)
  @ApiOkResponse({
    type: UniversityReadResponse,
  })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Get('me')
  async read(@Request() req: RequestContext): Promise<UniversityReadResponse> {
    return await req.user.university;
  }
}
