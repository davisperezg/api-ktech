import * as mongoose from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';
export declare type ServiceDocument = Service & mongoose.Document;
export declare class Service {
    name: string;
    description: string;
    price: number;
    category: Category;
}
export declare const ServiceSchema: mongoose.Schema<mongoose.Document<Service, {}>, mongoose.Model<any, any>, undefined>;
