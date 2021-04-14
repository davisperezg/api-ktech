import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthResolver } from './resolvers/auth.resolver';
import { UserEntity } from './../user/entities/user.entity';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from '../lib/strategies/jwt.strategies';
import { GqlAuthGuard } from '../lib/guards/gql-auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy, GqlAuthGuard],
})
export class AuthModule {}
