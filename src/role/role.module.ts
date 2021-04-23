import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { RoleResolver } from './resolvers/role.resolver';
import { RoleSchema } from './schemas/role.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }])],
  providers: [RoleService, RoleResolver],
})
export class RoleModule {}
