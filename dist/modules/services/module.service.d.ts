import { MenuService } from './../../menu/services/menu.service';
import { OnApplicationBootstrap } from '@nestjs/common';
import { ModuleDocument } from '../schemas/module.schema';
import { Model } from 'mongoose';
import { CreateModuleInput } from '../dto/inputs/create-module.input';
import { UpdateModuleInput } from '../dto/inputs/update-module.input';
import { AccessService } from 'src/access/services/access.service';
import { RoleDocument } from 'src/role/schemas/role.schema';
import { UserDocument } from 'src/user/schemas/user.schema';
export declare class ModuleService implements OnApplicationBootstrap {
    private readonly moduleModel;
    private readonly roleModel;
    private readonly userModel;
    private readonly accessService;
    private readonly menuService;
    constructor(moduleModel: Model<ModuleDocument>, roleModel: Model<RoleDocument>, userModel: Model<UserDocument>, accessService: AccessService, menuService: MenuService);
    findMenuSA: (items: any[], value: string) => boolean;
    findAccessSA: (items: any[], value: any[]) => boolean[];
    onApplicationBootstrap(): Promise<ModuleDocument[] | number>;
    createModule(moduleInput: CreateModuleInput): Promise<ModuleDocument>;
    updateModule(moduleInput: UpdateModuleInput): Promise<ModuleDocument>;
    deleteModule(id: string): Promise<boolean>;
    findAllModules(): Promise<ModuleDocument[]>;
    findOneModuleById(id: string): Promise<ModuleDocument>;
    findOneModuleByName(name: string, param: string): Promise<ModuleDocument>;
    findIdsByNameModules(modules: any[]): Promise<ModuleDocument[]>;
    findModulesByNames(param: string[]): Promise<ModuleDocument[]>;
}
