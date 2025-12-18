import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminRole } from './admin-user.entity';

export interface JwtPayload {
  sub: string;
  username: string;
  role: AdminRole;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false, // still respects 365d
      secretOrKey: config.get<string>('JWT_SECRET'),
      expireIn: config.get<string>('JWT_EXPIRES_IN', '1m'),
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
