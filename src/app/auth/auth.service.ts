import * as bcrypt from 'bcryptjs';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UserService } from '@app/user/user.service';
import { User, UserWithoutAuth } from '@app/user/user.entity';
import { Auth } from '@app/auth/auth.entity';
import { loginResponse } from '@type/auth/auth.resp';
import { createOrUpdateAuthDto, jwtPayloadDto } from '@type/auth/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  async bcryptCompareUser(inputPassword: string, user: User): Promise<boolean> {
    const savedPassword = user.auth.password;
    const result = await bcrypt.compare(inputPassword, savedPassword);
    return result;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await this.bcryptCompareUser(password, user))) {
      return user;
    }
    return null;
  }

  async login(user: UserWithoutAuth): Promise<loginResponse> {
    const payload: jwtPayloadDto = {
      email: user.email,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async create(createAuthDto: createOrUpdateAuthDto): Promise<Auth> {
    const { password, salt } = await this.createNewPassword(
      createAuthDto.password,
    );
    const authDto = {
      user: createAuthDto.user,
      password,
      salt,
    };
    const auth = await this.authRepository.create(authDto);
    try {
      return await this.authRepository.save(auth);
    } catch (e) {
      if (e instanceof QueryFailedError) return createAuthDto.user.auth;
      else throw e;
    }
  }

  async update(updateAuthDto: createOrUpdateAuthDto): Promise<boolean> {
    const { user } = updateAuthDto;
    const { password, salt } = await this.createNewPassword(
      updateAuthDto.password,
    );
    const authDto = {
      user: user,
      password,
      salt,
    };
    const updatedAuth = await this.authRepository.update(user.auth, authDto);
    return true;
  }

  async createNewPassword(
    inputPassword: string,
  ): Promise<{ password: string; salt: string }> {
    const round = 10;
    const salt = await bcrypt.genSalt(round);
    const password = await bcrypt.hash(inputPassword, salt);
    return {
      password,
      salt,
    };
  }
}
