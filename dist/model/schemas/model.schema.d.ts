import * as mongoose from 'mongoose';
import { Brand } from 'src/brand/schemas/brand.schema';
export declare type ModelDocument = Model & mongoose.Document;
export declare class Model {
    name: string;
    brand: Brand;
    status: number;
}
export declare const ModelSchema: mongoose.Schema<mongoose.Document<Model, {}>, mongoose.Model<any, any>, undefined>;
