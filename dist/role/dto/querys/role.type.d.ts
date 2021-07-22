import { ModuleType } from 'src/modules/dto/querys/module.type';
export declare class RoleType {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    modules: ModuleType[];
}
