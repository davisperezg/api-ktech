import { RoleType } from 'src/role/dto/querys/role.type';
export declare class UserType {
    id: string;
    name: string;
    lastName: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    role: RoleType;
    status: number;
}
