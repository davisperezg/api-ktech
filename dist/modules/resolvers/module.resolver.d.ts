import { CreateModuleInput } from '../dto/inputs/create-module.input';
import { UpdateModuleInput } from '../dto/inputs/update-module.input';
import { ModuleService } from '../services/module.service';
export declare class ModuleResolver {
    private readonly moduleService;
    constructor(moduleService: ModuleService);
    registerModule(moduleInput: CreateModuleInput): Promise<import("../schemas/module.schema").ModuleDocument>;
    updateModule(moduleInput: UpdateModuleInput): Promise<import("../schemas/module.schema").ModuleDocument>;
    deleteModule(id: string): Promise<boolean>;
    getModules(): Promise<import("../schemas/module.schema").ModuleDocument[]>;
    getModule(id: string): Promise<import("../schemas/module.schema").ModuleDocument>;
}
