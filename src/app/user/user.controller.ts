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
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { QueryFailedError } from 'typeorm';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { UserService } from '@app/user/user.service';
import { CreateUserDto, UpdateUserDto } from '@type/user/user.dto';
import { ApiController } from '@util/api_controller';
import { UserWithoutAuth } from './user.entity';
import { RequestContext } from '@type/common/common.dto';

@ApiTags('user')
@ApiController('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'create', description: 'User Create' })
  @ApiCreatedResponse({
    type: UserWithoutAuth,
  })
  @ApiBadRequestResponse()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserWithoutAuth> {
    try {
      return await this.userService.create(createUserDto);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestException();
      }
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'read', description: 'User Read' })
  @ApiOkResponse({
    type: UserWithoutAuth,
  })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @Get()
  async read(@Request() req: RequestContext): Promise<UserWithoutAuth> {
    try {
      return await this.userService.read(req.user);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestException();
      }
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'update', description: 'User Update' })
  @ApiOkResponse({
    type: UserWithoutAuth,
  })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @Patch()
  async update(
    @Request() req: RequestContext,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserWithoutAuth> {
    return await this.userService.update(req.user, updateUserDto);
  }

  @ApiOperation({ summary: 'isNewUser', description: 'User Unique Check' })
  @ApiOkResponse({
    type: UserWithoutAuth,
  })
  @ApiBadRequestResponse()
  @Get('is-new-user')
  async isNewUser(@Query() query: { email: string }): Promise<boolean> {
    try {
      return await this.userService.isNewUser(query.email);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestException();
      }
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'delete', description: 'User Delete' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @Delete()
  async delete(@Request() req: RequestContext) {
    try {
      return await this.userService.delete(req.user);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestException();
      }
      throw e;
    }
  }
}
