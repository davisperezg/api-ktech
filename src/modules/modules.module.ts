import { MenuSchema } from './../menu/schemas/menu.schema';
import { MenuService } from './../menu/services/menu.service';
import { Module } from '@nestjs/common';
import { ModuleService } from './services/module.service';
import { ModuleResolver } from './resolvers/module.resolver';
import { ModuleSchema } from './schemas/module.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessService } from 'src/access/services/access.service';
import { AccessSchema } from 'src/access/schemas/access.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Module', schema: ModuleSchema },
      { name: 'Access', schema: AccessSchema },
      { name: 'Menu', schema: MenuSchema },
    ]),
  ],
  providers: [ModuleService, ModuleResolver, AccessService, MenuService],
})
export class ModulesModule {}
