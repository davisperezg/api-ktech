import { CategoryType } from 'src/category/dto/querys/category.type';
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
}
