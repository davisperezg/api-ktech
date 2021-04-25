import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { RoleResolver } from './resolvers/role.resolver';
import { RoleSchema } from './schemas/role.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleService } from 'src/modules/services/module.service';
import { ModuleSchema } from 'src/modules/schemas/module.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Role', schema: RoleSchema },
      { name: 'Module', schema: ModuleSchema },
    ]),
  ],
  providers: [RoleService, RoleResolver, ModuleService],
})
export class RoleModule {}
