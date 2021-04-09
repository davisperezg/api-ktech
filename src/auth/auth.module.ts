import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthResolver } from './resolvers/auth.resolver';
import { UserEntity } from './../user/entities/user.entity';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from 'src/strategies/jwt.strategies';
import { GqlAuthGuard } from '../guards/gql-auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy, GqlAuthGuard],
})
export class AuthModule {}
