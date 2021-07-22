import { UpdateRoleUserInput } from 'src/role/dto/inputs/role-update.input';
export declare class UserUpdateInput {
    id: string;
    name?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    role?: UpdateRoleUserInput;
}
