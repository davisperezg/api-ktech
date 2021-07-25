import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCategoryInput } from '../dto/inputs/create-category.input';
import { UpdateCategoryInput } from '../dto/inputs/update-category.input';
import { CategoryDocument } from '../schemas/category.schema';
export declare class CategoryService implements OnModuleInit {
    private readonly categoryModel;
    constructor(categoryModel: Model<CategoryDocument>);
    onModuleInit(): Promise<void>;
    createCategory(categoryInput: CreateCategoryInput): Promise<CategoryDocument>;
    updateCategory(categoryInput: UpdateCategoryInput): Promise<CategoryDocument>;
    findAllCategory(): Promise<CategoryDocument[]>;
    findOneCategoryByName(name: string, param: string): Promise<CategoryDocument>;
    findOneCategoryById(id: string): Promise<CategoryDocument>;
}
