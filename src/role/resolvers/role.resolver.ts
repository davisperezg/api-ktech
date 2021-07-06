import { UserDocument } from './../../user/schemas/user.schema';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CtxUser } from 'src/lib/decorators/ctx-user.decorators';
import { hasRoles } from 'src/lib/decorators/roles.decorators';
import { GqlAuthGuard } from 'src/lib/guards/gql-auth.guard';
import { RolesGuard } from 'src/lib/guards/roles.guard';
import { RoleUpdateInput } from '../dto/inputs/role-update.input';
import { RoleInput } from '../dto/inputs/role.input';
import { RoleType } from '../dto/querys/role.type';
import { RoleService } from '../services/role.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  //Create role
  @Mutation(() => RoleType)
  registerRole(
    @Args('roleInput') roleInput: RoleInput,
    @CtxUser() user: UserDocument,
  ) {
    return this.roleService.createRole(roleInput, user);
  }

  //Put role
  @Mutation(() => RoleType)
  updateRole(
    @Args({ name: 'roleInput', type: () => RoleUpdateInput })
    roleInput: RoleUpdateInput,
  ) {
    return this.roleService.updateRole(roleInput);
  }

  //Delete role
  @Mutation(() => Boolean)
  @hasRoles('SuperAdmin')
  deleteRole(@Args('id') id: string) {
    return this.roleService.deleteRoleById(id);
  }

  //Get roles
  @Query(() => [RoleType])
  getRoles() {
    return this.roleService.findAllRoles();
  }

  //Get role
  @Query(() => RoleType)
  getRole(@Args('id') id: string) {
    return this.roleService.findOneRoleById(id);
  }
}
