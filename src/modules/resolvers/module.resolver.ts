import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Args, Resolver } from '@nestjs/graphql';
import { CreateModuleInput } from '../dto/inputs/create-module.input';
import { UpdateModuleInput } from '../dto/inputs/update-module.input';
import { ModuleType } from '../dto/querys/module.type';
import { ModuleService } from '../services/module.service';
import { GqlAuthGuard } from 'src/lib/guards/gql-auth.guard';
import { RolesGuard } from 'src/lib/guards/roles.guard';
import { hasRoles } from 'src/lib/decorators/roles.decorators';
import { CtxUser } from 'src/lib/decorators/ctx-user.decorators';
import { UserDocument } from 'src/user/schemas/user.schema';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
export class ModuleResolver {
  constructor(private readonly moduleService: ModuleService) {}

  @Mutation(() => ModuleType)
  @hasRoles('SuperAdmin')
  registerModule(
    @Args({ name: 'moduleInput', type: () => CreateModuleInput })
    moduleInput: CreateModuleInput,
  ) {
    return this.moduleService.createModule(moduleInput);
  }

  @Mutation(() => ModuleType)
  @hasRoles('SuperAdmin')
  updateModule(
    @Args({ name: 'moduleInput', type: () => UpdateModuleInput })
    moduleInput: UpdateModuleInput,
  ) {
    return this.moduleService.updateModule(moduleInput);
  }

  @Mutation(() => Boolean)
  @hasRoles('SuperAdmin')
  deleteModule(@Args('id') id: string) {
    return this.moduleService.deleteModule(id);
  }

  @Query(() => [ModuleType])
  //@hasRoles('SuperAdmin')
  getModules() {
    return this.moduleService.findAllModules();
  }

  @Query(() => ModuleType)
  @hasRoles('SuperAdmin')
  getModule(@Args('id') id: string) {
    return this.moduleService.findOneModuleById(id);
  }
}
