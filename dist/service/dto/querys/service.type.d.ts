import { CategoryType } from './../../../category/dto/querys/category.type';
export declare class ServiceType {
    id: string;
    name: string;
    description: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    category: CategoryType;
}
