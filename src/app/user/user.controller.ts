import {
  Body,
  Get,
  Post,
  Patch,
  Query,
  UseGuards,
  Request,
  Delete,
  HttpCode,
  HttpStatus,
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
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { UserService } from '@app/user/user.service';
import { UserCreateRequest, UserUpdateRequest } from '@type/user/user.req';
import { ApiController } from '@util/api_controller';
import { RequestContext } from '@type/common/common.dto';
import {
  UserCreateResponse,
  UserReadResponse,
  UserUpdateResponse,
} from '@type/user/user.resp';
import { AuthHeader } from '@util/auth_header';
import { SocialProvider } from '@app/oauth/oauth.enum';
import { serialize } from '@util/serialize';

@ApiTags('user')
@ApiController('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'create', description: 'User Create' })
  @ApiCreatedResponse({
    type: UserCreateResponse,
  })
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() createRequest: UserCreateRequest,
  ): Promise<UserCreateResponse> {
    const user = await this.userService.create({
      ...createRequest,
      provider: SocialProvider.LOCAL,
    });
    return {
      id: user.id,
      email: user.email,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'read', description: 'User Read (Me)' })
  @ApiHeader(AuthHeader)
  @ApiOkResponse({
    type: UserReadResponse,
  })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Get('me')
  async read(@Request() req: RequestContext): Promise<UserReadResponse> {
    const user = req.user;
    const manners = await (await user.manners).map((manner) => manner.score);
    return serialize({
      ...user,
      manner: manners.reduce((prev, cur) => prev + cur, 0) / manners.length,
      regionId: (await user.region)?.id,
      universityId: (await user.university)?.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'update', description: 'User Update' })
  @ApiHeader(AuthHeader)
  @ApiOkResponse({
    type: UserUpdateResponse,
  })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Patch()
  async update(
    @Request() req: RequestContext,
    @Body() updateRequest: UserUpdateRequest,
  ): Promise<UserUpdateResponse> {
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
