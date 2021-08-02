import * as mongoose from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';
import { User } from 'src/user/schemas/user.schema';
export declare type EgressDocument = Egress & mongoose.Document;
export declare class Egress {
    detail: string;
    observation?: string;
    units: number;
    category: Category;
    amount: number;
    status: number;
    user: User;
}
export declare const EgressSchema: mongoose.Schema<mongoose.Document<Egress, {}>, mongoose.Model<any, any>, undefined>;
