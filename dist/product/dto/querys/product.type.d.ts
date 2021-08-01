import { CategoryType } from './../../../category/dto/querys/category.type';
import { ModelType } from 'src/model/dto/querys/model.type';
import { BrandType } from 'src/brand/dto/querys/brand.type';
export declare class ProductType {
    id: string;
    name: string;
    description: string;
    price: number;
    cant: number;
    createdAt: Date;
    updatedAt: Date;
    category: CategoryType;
    brand: BrandType;
    model: ModelType;
}
