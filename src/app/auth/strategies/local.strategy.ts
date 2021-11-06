import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { User } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    if (!(await this.authService.validate(email, password)))
      throw new UnauthorizedException();
    const user = await this.userService.readByEmail(email);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
