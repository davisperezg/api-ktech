import { MenuSchema } from './../menu/schemas/menu.schema';
import { MenuService } from './../menu/services/menu.service';
import { Module } from '@nestjs/common';
import { ModuleService } from './services/module.service';
import { ModuleResolver } from './resolvers/module.resolver';
import { ModuleSchema } from './schemas/module.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessService } from 'src/access/services/access.service';
import { AccessSchema } from 'src/access/schemas/access.schema';
import { RoleSchema } from 'src/role/schemas/role.schema';
import { UserSchema } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/services/user.service';
import { RoleService } from 'src/role/services/role.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Module', schema: ModuleSchema },
      { name: 'Role', schema: RoleSchema },
      { name: 'Access', schema: AccessSchema },
      { name: 'Menu', schema: MenuSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [
    ModuleService,
    ModuleResolver,
    RoleService,
    AccessService,
    MenuService,
    UserService,
  ],
})
export class ModulesModule {}
