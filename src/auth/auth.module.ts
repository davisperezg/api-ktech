import { MenuService } from './../menu/services/menu.service';
import { MenuSchema } from './../menu/schemas/menu.schema';
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
import { ModuleSchema } from 'src/modules/schemas/module.schema';
import { ModuleService } from 'src/modules/services/module.service';
import { AccessSchema } from 'src/access/schemas/access.schema';
import { AccessService } from 'src/access/services/access.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Role', schema: RoleSchema },
      { name: 'Module', schema: ModuleSchema },
      { name: 'Access', schema: AccessSchema },
      { name: 'Menu', schema: MenuSchema },
    ]),
  ],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    GqlAuthGuard,
    UserService,
    RoleService,
    ModuleService,
    AccessService,
    MenuService,
  ],
})
export class AuthModule {}
