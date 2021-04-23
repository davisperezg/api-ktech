import { Module } from '@nestjs/common';
import { AuthResolver } from './resolvers/auth.resolver';
import { UserSchema } from '../user/schemas/user.schema';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from '../lib/strategies/jwt.strategies';
import { GqlAuthGuard } from '../lib/guards/gql-auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/user/services/user.service';
import { RoleService } from 'src/role/services/role.service';
import { RoleSchema } from 'src/role/schemas/role.schema';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Role', schema: RoleSchema },
    ]),
  ],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    GqlAuthGuard,
    UserService,
    RoleService,
  ],
})
export class AuthModule {}
