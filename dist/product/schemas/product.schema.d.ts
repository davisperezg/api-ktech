import * as mongoose from 'mongoose';
import { Brand } from 'src/brand/schemas/brand.schema';
import { Category } from 'src/category/schemas/category.schema';
import { Model } from 'src/model/schemas/model.schema';
export declare type ProductDocument = Product & mongoose.Document;
export declare class Product {
    name: string;
    description: string;
    price: number;
    cant: number;
    category: Category;
    brand: Brand;
    model: Model;
    status: number;
}
export declare const ProductSchema: mongoose.Schema<mongoose.Document<Product, {}>, mongoose.Model<any, any>, undefined>;
