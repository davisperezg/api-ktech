import { MenuService } from './../services/menu.service';
import { MenuType } from './../dto/querys/menu.type';
import { Mutation, Query, Args, Resolver } from '@nestjs/graphql';
import { CreateMenuInput } from './../dto/inputs/create-menu.input';

@Resolver()
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  @Mutation(() => MenuType)
  registerMenu(
    @Args({ name: 'menuInput', type: () => CreateMenuInput })
    menuInput: CreateMenuInput,
  ) {
    return this.menuService.createMenu(menuInput);
  }
}
