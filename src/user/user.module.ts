import { MenuSchema } from './../menu/schemas/menu.schema';
import { MenuService } from './../menu/services/menu.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from 'src/role/schemas/role.schema';
import { RoleService } from 'src/role/services/role.service';
import { UserSchema } from './schemas/user.schema';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';
import { ModuleService } from 'src/modules/services/module.service';
import { ModuleSchema } from 'src/modules/schemas/module.schema';
import { AccessService } from 'src/access/services/access.service';
import { AccessSchema } from 'src/access/schemas/access.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Role', schema: RoleSchema },
      { name: 'Module', schema: ModuleSchema },
      { name: 'Access', schema: AccessSchema },
      { name: 'Menu', schema: MenuSchema },
    ]),
  ],
  providers: [
    UserService,
    UserResolver,
    RoleService,
    ModuleService,
    AccessService,
    MenuService,
  ],
})
export class UserModule {}
