import * as mongoose from 'mongoose';
export declare type CategoryDocument = Category & mongoose.Document;
export declare class Category {
    name: string;
    status: number;
}
export declare const CategorySchema: mongoose.Schema<mongoose.Document<Category, {}>, mongoose.Model<any, any>, undefined>;
