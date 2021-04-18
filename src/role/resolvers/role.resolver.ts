import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/lib/guards/gql-auth.guard';
import { RoleInput } from '../dto/inputs/role.input';
import { RoleType } from '../dto/querys/role.type';
import { RoleService } from '../services/role.service';

@Resolver()
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => RoleType)
  async registerRole(@Args('roleInput') roleInput: RoleInput) {
    return await this.roleService.createRole(roleInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => RoleType)
  async updateRole(
    @Args('id') id: string,
    @Args('roleInput') roleInput: RoleInput,
  ) {
    const { name, description } = roleInput;
    const inputRoleFormated: RoleInput = {
      name: name.trim(),
      description: description.trim(),
    };

    return await this.roleService.updateRole(id, inputRoleFormated);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteRole(@Args('id') id: string) {
    return await this.roleService.deleteRoleById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [RoleType])
  async getRoles() {
    return await this.roleService.findAllRoles();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => RoleType)
  async getRole(@Args('id') id: string) {
    return await this.roleService.findOneRoleById(id);
  }
}
