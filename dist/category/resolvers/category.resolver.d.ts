import { CategoryService } from '../services/category.service';
import { CreateCategoryInput } from '../dto/inputs/create-category.input';
import { UpdateCategoryInput } from '../dto/inputs/update-category.input';
import { CategoryDocument } from '../schemas/category.schema';
export declare class CategoryResolver {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    registerCategory(categoryInput: CreateCategoryInput): Promise<CategoryDocument>;
    updateCategory(categoryInput: UpdateCategoryInput): Promise<CategoryDocument>;
    getCategorys(): Promise<CategoryDocument[]>;
}
