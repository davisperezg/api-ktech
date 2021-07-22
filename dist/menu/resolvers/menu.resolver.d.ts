import { MenuService } from './../services/menu.service';
import { CreateMenuInput } from './../dto/inputs/create-menu.input';
import { UpdateMenuInput } from '../dto/inputs/update-menu.input';
import { MenuDocument } from '../schemas/menu.schema';
export declare class MenuResolver {
    private readonly menuService;
    constructor(menuService: MenuService);
    registerMenu(menuInput: CreateMenuInput): Promise<MenuDocument>;
    updateMenu(menuInput: UpdateMenuInput): Promise<MenuDocument>;
    getMenus(): Promise<MenuDocument[]>;
}
