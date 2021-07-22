import { UpdateNameMenuDTO } from './../../../menu/dto/inputs/update-menu.input';
export declare class UpdateModuleInput {
    id: string;
    name?: string;
    description?: string;
    access?: UpdateAccessModuleInput[];
    menus: UpdateNameMenuDTO[];
}
export declare class UpdateAccessModuleInput {
    name?: string;
}
