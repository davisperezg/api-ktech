import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/lib/guards/gql-auth.guard';
import { RoleUpdateInput } from '../dto/inputs/role-update.input';
import { RoleInput } from '../dto/inputs/role.input';
import { RoleType } from '../dto/querys/role.type';
import { RoleService } from '../services/role.service';

@Resolver()
//@UseGuards(GqlAuthGuard)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  //Create role
  @Mutation(() => RoleType)
  registerRole(@Args('roleInput') roleInput: RoleInput) {
    return this.roleService.createRole(roleInput);
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
