import { CategorySchema } from './../category/schemas/category.schema';
import { Module } from '@nestjs/common';
import { EgressResolver } from './resolvers/egress.resolver';
import { EgressSchema } from './schemas/egress.schema';
import { EgressService } from './services/egress.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from 'src/category/services/category.service';
import { UserSchema } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/services/user.service';
import { RoleSchema } from 'src/role/schemas/role.schema';
import { RoleService } from 'src/role/services/role.service';
import { ModuleService } from 'src/modules/services/module.service';
import { ModuleSchema } from 'src/modules/schemas/module.schema';
import { AccessSchema } from 'src/access/schemas/access.schema';
import { MenuSchema } from 'src/menu/schemas/menu.schema';
import { AccessService } from 'src/access/services/access.service';
import { MenuService } from 'src/menu/services/menu.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Egress', schema: EgressSchema },
      { name: 'Category', schema: CategorySchema },
      { name: 'User', schema: UserSchema },
      { name: 'Role', schema: RoleSchema },
      { name: 'Module', schema: ModuleSchema },
      { name: 'Access', schema: AccessSchema },
      { name: 'Menu', schema: MenuSchema },
    ]),
  ],
  providers: [
    EgressResolver,
    EgressService,
    CategoryService,
    UserService,
    RoleService,
    ModuleService,
    AccessService,
    MenuService,
  ],
})
export class EgressModule {}
