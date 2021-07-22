import { CreateRoleModuleInput } from 'src/modules/dto/inputs/create-module.input';
export declare class RoleInput {
    name: string;
    description?: string;
    modules: CreateRoleModuleInput[];
}
export declare class CreateRoleUserInput {
    name: string;
}
