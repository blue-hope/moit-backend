import {
  Body,
  Get,
  Post,
  Patch,
  Query,
  UseGuards,
  BadRequestException,
  Request,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiHeader,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { QueryFailedError } from 'typeorm';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { UserService } from '@app/user/user.service';
import { CreateRequest, UpdateRequest } from '@type/user/user.req';
import { ApiController } from '@util/api_controller';
import { RequestContext } from '@type/common/common.dto';
import {
  CreateResponse,
  ReadResponse,
  IsNewUserResponse,
  UpdateResponse,
} from '@type/user/user.resp';
import { AuthHeader } from '@util/auth_header';

@ApiTags('user')
@ApiController('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'create', description: 'User Create' })
  @ApiCreatedResponse({
    type: CreateResponse,
  })
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createRequest: CreateRequest): Promise<CreateResponse> {
    return await this.userService.create(createRequest);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'read', description: 'User Read (Me)' })
  @ApiHeader(AuthHeader)
  @ApiOkResponse({
    type: ReadResponse,
  })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Get('me')
  async read(@Request() req: RequestContext): Promise<ReadResponse> {
    const user = req.user;
    return {
      ...user,
      region_id: (await user.region)?.id,
      university_id: (await user.university)?.id,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'update', description: 'User Update' })
  @ApiHeader(AuthHeader)
  @ApiOkResponse({
    type: UpdateResponse,
  })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Patch()
  async update(
    @Request() req: RequestContext,
    @Body() updateRequest: UpdateRequest,
  ): Promise<UpdateResponse> {
    return await this.userService.update(req.user, updateRequest);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'delete', description: 'User Delete' })
  @ApiHeader(AuthHeader)
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Delete()
  async delete(@Request() req: RequestContext) {
    return await this.userService.delete(req.user);
  }

  @ApiOperation({ summary: 'exist', description: 'User Exist Check' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  @Get('exist')
  async isNewUser(@Query('email') email: string) {
    if (!(await this.userService.readByEmail(email)))
      throw new NotFoundException();
  }
}
