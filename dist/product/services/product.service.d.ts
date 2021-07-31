import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { BrandService } from 'src/brand/services/brand.service';
import { CategoryService } from 'src/category/services/category.service';
import { ModelService } from 'src/model/services/model.service';
import { CreateProductInput } from '../dto/inputs/create-product.input';
import { UpdateProductInput } from '../dto/inputs/update-product.input';
import { ProductDocument } from '../schemas/product.schema';
export declare class ProductService implements OnModuleInit {
    private readonly productModel;
    private readonly categoryService;
    private readonly brandService;
    private readonly modelService;
    constructor(productModel: Model<ProductDocument>, categoryService: CategoryService, brandService: BrandService, modelService: ModelService);
    onModuleInit(): Promise<void>;
    createProduct(productInput: CreateProductInput): Promise<ProductDocument>;
    updateProduct(productInput: UpdateProductInput): Promise<ProductDocument>;
    deleteProductById(id: string): Promise<boolean>;
    findAllProducts(): Promise<ProductDocument[]>;
    findProductsByCategoryBrandModel(category: string, brand: string, model: string): Promise<ProductDocument[]>;
    findOneProductById(id: string): Promise<ProductDocument>;
    findOneProductByName(name: string, param: string): Promise<ProductDocument>;
}
