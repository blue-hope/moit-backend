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
} from '@nestjs/swagger';
import { QueryFailedError } from 'typeorm';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { UserService } from '@app/user/user.service';
import { createUserDto, updateUserDto } from '@type/user/user.dto';
import { generalUserResponse } from '@type/user/user.resp';
import { APIController } from '@util/api_controller';

@ApiTags('user')
@APIController('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'create', description: '유저 정보 생성 (회원가입)' })
  @ApiCreatedResponse({
    type: generalUserResponse,
  })
  @ApiBadRequestResponse()
  async create(
    @Body() createUserDto: createUserDto,
  ): Promise<generalUserResponse> {
    try {
      return await this.userService.create(createUserDto);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestException();
      }
      throw e;
    }
  }

  @Patch()
  @ApiOperation({ summary: 'update', description: '유저 정보 업데이트' })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: generalUserResponse,
  })
  @ApiBadRequestResponse()
  async update(
    @Request() req,
    @Body() updateUserDto: updateUserDto,
  ): Promise<generalUserResponse> {
    return await this.userService.update(req.user, updateUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'read', description: '유저 정보 가져오기' })
  @ApiOkResponse({
    type: generalUserResponse,
  })
  @ApiBadRequestResponse()
  async read(@Request() req): Promise<generalUserResponse> {
    try {
      return await this.userService.read(req.user);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestException();
      }
      throw e;
    }
  }

  @Get('check')
  @ApiOperation({ summary: 'ID check', description: 'ID 중복 여부 확인' })
  @ApiOkResponse({
    type: generalUserResponse,
  })
  @ApiBadRequestResponse()
  async checkIdDuplicate(@Query() query): Promise<any> {
    try {
      return await this.userService.checkIdDuplicate(query.email);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestException();
      }
      throw e;
    }
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'delete', description: '유저 정보 삭제 (회원탈퇴)' })
  @ApiOkResponse({
    type: generalUserResponse,
  })
  @ApiBadRequestResponse()
  async destroy(@Request() req): Promise<generalUserResponse> {
    try {
      return await this.userService.destroy(req.user);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestException();
      }
      throw e;
    }
  }
}
