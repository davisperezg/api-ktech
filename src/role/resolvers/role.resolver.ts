import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/lib/guards/gql-auth.guard';
import { RoleUpdateInput } from '../dto/inputs/role-update.input';
import { RoleInput } from '../dto/inputs/role.input';
import { RoleType } from '../dto/querys/role.type';
import { RoleEntity } from '../entities/role.entity';
import { RoleService } from '../services/role.service';

@Resolver()
//@UseGuards(GqlAuthGuard)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  //Se formatea a trim() anulando los espacios o tabs ingresados en el input
  async InputFormated(role: RoleInput, id?: string): Promise<RoleInput> {
    const { name, description } = role;
    let findRoleRegistered: RoleEntity;

    //id para el update
    if (id) {
      try {
        findRoleRegistered = await this.roleService.findOneRoleById(id);
      } catch (e) {
        throw new Error(`Error en UserResolver.InputFormated ${e}`);
      }

      if (!findRoleRegistered)
        throw new BadRequestException(`Usuario no existe en el resolver`);
    }

    return {
      name: name ? name.trim() : findRoleRegistered.name,
      description: description
        ? description.trim()
        : findRoleRegistered.description,
    };
  }

  //Create role
  @Mutation(() => RoleType)
  async registerRole(@Args('roleInput') roleInput: RoleInput) {
    const inputRoleFormated = await this.InputFormated({
      name: roleInput.name,
      description: roleInput.description,
    });

    return await this.roleService.createRole(inputRoleFormated);
  }

  //Put role
  @Mutation(() => RoleType)
  async updateRole(
    @Args('id') id: string,
    @Args('roleInput') roleInput: RoleUpdateInput,
  ) {
    const inputRoleFormated = await this.InputFormated(
      {
        name: roleInput.name,
        description: roleInput.description,
      },
      id,
    );

    return await this.roleService.updateRole(id, inputRoleFormated);
  }

  //Delete role
  @Mutation(() => Boolean)
  async deleteRole(@Args('id') id: string) {
    return await this.roleService.deleteRoleById(id);
  }

  //Get roles
  @Query(() => [RoleType])
  async getRoles() {
    return await this.roleService.findAllRoles();
  }

  //Get role
  @Query(() => RoleType)
  async getRole(@Args('id') id: string) {
    return await this.roleService.findOneRoleById(id);
  }
}
