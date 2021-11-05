import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { jwtConstant } from '@constant/jwt.constant';
import { jwtDataDto } from '@type/auth/auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstant.secret,
    });
  }

  async validate(jwtData: jwtDataDto) {
    return await this.userService.findOneByEmail(jwtData.email);
  }
}
