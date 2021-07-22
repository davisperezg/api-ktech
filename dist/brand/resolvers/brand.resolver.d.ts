import { UpdateBrandInput } from './../dto/inputs/update-brand.input';
import { CreateBrandInput } from './../dto/inputs/create-brand.input';
import { BrandService } from '../services/brand.service';
import { BrandDocument } from '../schemas/brand.schema';
export declare class BrandResolver {
    private readonly brandService;
    constructor(brandService: BrandService);
    registerBrand(brandInput: CreateBrandInput): Promise<BrandDocument>;
    updateBrand(brandInput: UpdateBrandInput): Promise<BrandDocument>;
    getBrands(): Promise<BrandDocument[]>;
    getBrandsByCategory(category: string): Promise<BrandDocument[]>;
}
