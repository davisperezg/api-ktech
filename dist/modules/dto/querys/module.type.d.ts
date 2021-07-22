import { MenuType } from './../../../menu/dto/querys/menu.type';
import { AccessType } from './../../../access/dto/querys/access.type';
export declare class ModuleType {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    access: AccessType[];
    menus: MenuType[];
}
