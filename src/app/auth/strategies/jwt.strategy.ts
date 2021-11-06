import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { JwtConstant } from '@constant/jwt';
import { User } from '@app/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConstant.secret,
    });
  }

  async validate(jwtData: {
    email: string;
    sub: number;
    iat: number;
    exp: number;
  }): Promise<User> {
    const user = await this.userService.readByEmail(jwtData.email);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
