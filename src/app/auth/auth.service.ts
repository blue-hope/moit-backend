import * as bcrypt from 'bcryptjs';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, QueryFailedError, Repository } from 'typeorm';
import { UserService } from '@app/user/user.service';
import { User } from '@app/user/user.entity';
import { Auth } from '@app/auth/auth.entity';
import { HASH_ROUND } from '@constant/bycrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async comparePassword(user: User, inputPassword: string): Promise<boolean> {
    const auth = await user.auth;
    const savedPassword = auth.password;
    return await bcrypt.compare(inputPassword, savedPassword);
  }

  async validate(email: string, password: string): Promise<boolean> {
    const user = await this.userService.readByEmail(email);
    return !!user && (await this.comparePassword(user, password));
  }

  login(user: User): string {
    return this.jwtService.sign({
      email: user.email,
      sub: user.id,
    });
  }

  async create(user: User, password: string) {
    const { hashedPassword, salt } = await this.createHashedPassword(password);
    const authDto = {
      user: Promise.resolve(user),
      password: hashedPassword,
      salt,
    };
    await Auth.create(authDto).save();
  }

  async update(user: User, password: string) {
    const { hashedPassword, salt } = await this.createHashedPassword(password);
    const authDto = {
      password: hashedPassword,
      salt,
    };
    await Auth.update(await user.auth, authDto);
  }

  async createHashedPassword(
    inputPassword: string,
  ): Promise<{ hashedPassword: string; salt: string }> {
    const salt = await bcrypt.genSalt(HASH_ROUND);
    const hashedPassword = await bcrypt.hash(inputPassword, salt);
    return {
      hashedPassword,
      salt,
    };
  }
}
