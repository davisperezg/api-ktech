import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Args, Resolver } from '@nestjs/graphql';
import { CreateModuleInput } from '../dto/inputs/create-module.input';
import { UpdateModuleInput } from '../dto/inputs/update-module.input';
import { ModuleType } from '../dto/querys/module.type';
import { ModuleService } from '../services/module.service';
import { GqlAuthGuard } from 'src/lib/guards/gql-auth.guard';

@Resolver()
@UseGuards(GqlAuthGuard)
export class ModuleResolver {
  constructor(private readonly moduleService: ModuleService) {}

  @Mutation(() => ModuleType)
  registerModule(
    @Args({ name: 'moduleInput', type: () => CreateModuleInput })
    moduleInput: CreateModuleInput,
  ) {
    return this.moduleService.createModule(moduleInput);
  }

  @Mutation(() => ModuleType)
  updateModule(
    @Args({ name: 'moduleInput', type: () => UpdateModuleInput })
    moduleInput: UpdateModuleInput,
  ) {
    return this.moduleService.updateModule(moduleInput);
  }

  @Mutation(() => Boolean)
  deleteModule(@Args('id') id: string) {
    return this.moduleService.deleteModule(id);
  }

  @Query(() => [ModuleType])
  getModules() {
    return this.moduleService.findAllModules();
  }

  @Query(() => ModuleType)
  getModule(@Args('id') id: string) {
    return this.moduleService.findOneModuleById(id);
  }
}
