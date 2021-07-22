import { CreateRoleUserInput } from 'src/role/dto/inputs/role.input';
export declare class UserInput {
    name: string;
    lastName: string;
    role: CreateRoleUserInput;
    email: string;
    password: string;
    confirmPassword: string;
}
