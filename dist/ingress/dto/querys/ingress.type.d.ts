import { CategoryType } from 'src/category/dto/querys/category.type';
import { UserType } from 'src/user/dto/querys/user.type';
export declare class IngressType {
    id: string;
    detail: string;
    observation: string;
    units: number;
    category: CategoryType;
    amount: number;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    user: UserType;
}
