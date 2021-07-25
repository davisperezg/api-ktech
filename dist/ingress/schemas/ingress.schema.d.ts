import * as mongoose from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';
export declare type IngressDocument = Ingress & mongoose.Document;
export declare class Ingress {
    detail: string;
    observation?: string;
    units: number;
    category: Category;
    amount: number;
    status: number;
}
export declare const IngressSchema: mongoose.Schema<mongoose.Document<Ingress, {}>, mongoose.Model<any, any>, undefined>;
