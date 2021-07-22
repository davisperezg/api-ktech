import { RoleInput } from '../dto/inputs/role.input';
import { RoleDocument } from '../schemas/role.schema';
import { Model } from 'mongoose';
import { RoleUpdateInput } from '../dto/inputs/role-update.input';
import { ModuleService } from 'src/modules/services/module.service';
import { UserDocument } from 'src/user/schemas/user.schema';
export declare class RoleService {
    private readonly roleModel;
    private readonly moduleService;
    constructor(roleModel: Model<RoleDocument>, moduleService: ModuleService);
    findModuleSA: (items: any[], value: string) => boolean;
    createRole(roleInput: RoleInput, user: UserDocument): Promise<RoleDocument>;
    updateRole(roleInput: RoleUpdateInput): Promise<RoleDocument>;
    deleteRoleById(id: string): Promise<boolean>;
    findAllRoles(): Promise<RoleDocument[]>;
    findOneRoleById(id: string): Promise<RoleDocument>;
    findOneRoleByName(name: string, param: string): Promise<RoleDocument>;
}
