import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { jwtConstant } from '@constant/jwt.constant';
import { JwtDataDto } from '@type/auth/auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstant.secret,
    });
  }

  async validate(jwtData: JwtDataDto) {
    const user = await this.userService.findOneByEmail(jwtData.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
