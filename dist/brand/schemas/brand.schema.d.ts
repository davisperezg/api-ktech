import * as mongoose from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';
export declare type BrandDocument = Brand & mongoose.Document;
export declare class Brand {
    name: string;
    category: Category;
}
export declare const BrandSchema: mongoose.Schema<mongoose.Document<Brand, {}>, mongoose.Model<any, any>, undefined>;
