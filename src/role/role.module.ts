import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { RoleResolver } from './resolvers/role.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [RoleService, RoleResolver],
})
export class RoleModule {}
