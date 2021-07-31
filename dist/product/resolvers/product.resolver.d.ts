import { ProductDocument } from './../schemas/product.schema';
import { ProductService } from '../services/product.service';
import { CreateProductInput } from '../dto/inputs/create-product.input';
import { UpdateProductInput } from '../dto/inputs/update-product.input';
export declare class ProductResolver {
    private readonly productService;
    constructor(productService: ProductService);
    registerProduct(productInput: CreateProductInput): Promise<ProductDocument>;
    updateProduct(productInput: UpdateProductInput): Promise<ProductDocument>;
    deleteProduct(id: string): Promise<boolean>;
    getProducts(): Promise<ProductDocument[]>;
    getProductsByCategoryBrandModel(category: string, brand: string, model: string): Promise<ProductDocument[]>;
    getProductByName(product: string): Promise<ProductDocument>;
}
