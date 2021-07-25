import { OnModuleInit } from '@nestjs/common';
import { BrandDocument } from '../schemas/brand.schema';
import { Model } from 'mongoose';
import { CategoryService } from 'src/category/services/category.service';
import { CreateBrandInput } from '../dto/inputs/create-brand.input';
import { UpdateBrandInput } from '../dto/inputs/update-brand.input';
export declare class BrandService implements OnModuleInit {
    private readonly brandModel;
    private readonly categoryService;
    constructor(brandModel: Model<BrandDocument>, categoryService: CategoryService);
    onModuleInit(): Promise<void>;
    createBrand(brandInput: CreateBrandInput): Promise<BrandDocument>;
    updateBrand(brandInput: UpdateBrandInput): Promise<BrandDocument>;
    findAllBrands(): Promise<BrandDocument[]>;
    findBrandsByCategory(category: string): Promise<BrandDocument[]>;
    findOneBrandById(id: string): Promise<BrandDocument>;
    findOneBrandByName(name: string, param: string): Promise<BrandDocument>;
}
