import { MenuSchema } from './../menu/schemas/menu.schema';
import { MenuService } from './../menu/services/menu.service';
import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { RoleResolver } from './resolvers/role.resolver';
import { RoleSchema } from './schemas/role.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleService } from 'src/modules/services/module.service';
import { ModuleSchema } from 'src/modules/schemas/module.schema';
import { AccessService } from 'src/access/services/access.service';
import { AccessSchema } from 'src/access/schemas/access.schema';
import { UserService } from 'src/user/services/user.service';
import { UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Role', schema: RoleSchema },
      { name: 'Module', schema: ModuleSchema },
      { name: 'Access', schema: AccessSchema },
      { name: 'Menu', schema: MenuSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [
    RoleService,
    RoleResolver,
    ModuleService,
    AccessService,
    MenuService,
    UserService,
  ],
})
export class RoleModule {}
