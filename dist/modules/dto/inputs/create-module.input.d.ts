import { CreateNameMenuDTO } from './../../../menu/dto/inputs/create-menu.input';
export declare class CreateModuleInput {
    name: string;
    description: string;
    access: CreateAccessModuleInput[];
    menus: CreateNameMenuDTO[];
}
export declare class CreateRoleModuleInput {
    name: string;
}
export declare class CreateAccessModuleInput {
    name: string;
}
