import { UserDocument } from './../../user/schemas/user.schema';
import { RoleUpdateInput } from '../dto/inputs/role-update.input';
import { RoleInput } from '../dto/inputs/role.input';
import { RoleService } from '../services/role.service';
export declare class RoleResolver {
    private readonly roleService;
    constructor(roleService: RoleService);
    registerRole(roleInput: RoleInput, user: UserDocument): Promise<import("../schemas/role.schema").RoleDocument>;
    updateRole(roleInput: RoleUpdateInput): Promise<import("../schemas/role.schema").RoleDocument>;
    deleteRole(id: string): Promise<boolean>;
    getRoles(): Promise<import("../schemas/role.schema").RoleDocument[]>;
    getRole(id: string): Promise<import("../schemas/role.schema").RoleDocument>;
}
