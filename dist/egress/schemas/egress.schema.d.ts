import * as mongoose from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';
export declare type EgressDocument = Egress & mongoose.Document;
export declare class Egress {
    detail: string;
    observation?: string;
    units: number;
    category: Category;
    amount: number;
}
export declare const EgressSchema: mongoose.Schema<mongoose.Document<Egress, {}>, mongoose.Model<any, any>, undefined>;
