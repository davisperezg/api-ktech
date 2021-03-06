import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/lib/guards/gql-auth.guard';
import { MenuService } from './../services/menu.service';
import { MenuType } from './../dto/querys/menu.type';
import { Mutation, Query, Args, Resolver } from '@nestjs/graphql';
import { CreateMenuInput } from './../dto/inputs/create-menu.input';
import { UpdateMenuInput } from '../dto/inputs/update-menu.input';
import { MenuDocument } from '../schemas/menu.schema';
import { RolesGuard } from 'src/lib/guards/roles.guard';
import { hasRoles } from 'src/lib/decorators/roles.decorators';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  @Mutation(() => MenuType)
  @hasRoles('SuperAdmin')
  registerMenu(
    @Args({ name: 'menuInput', type: () => CreateMenuInput })
    menuInput: CreateMenuInput,
  ) {
    return this.menuService.createMenu(menuInput);
  }

  @Mutation(() => MenuType)
  @hasRoles('SuperAdmin')
  updateMenu(
    @Args({ name: 'menuInput', type: () => UpdateMenuInput })
    menuInput: UpdateMenuInput,
  ) {
    return this.menuService.updateMenu(menuInput);
  }

  @Query(() => [MenuType])
  getMenus(): Promise<MenuDocument[]> {
    return this.menuService.findAllMenu();
  }
}
