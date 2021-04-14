import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtType } from 'src/auth/dto/querys/jwt.type';
import { AuthService } from 'src/auth/services/auth.service';
import { jwtConstants } from '../../auth/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtType) {
    const findUser = await this.authService.validateUser(payload.userId);

    if (!findUser) throw new UnauthorizedException();

    return findUser;
  }
}
