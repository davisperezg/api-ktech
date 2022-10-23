import * as mongoose from 'mongoose';
import { Renew } from 'src/renew/schemas/renew.schema';
export declare type CanceledDocument = Canceled & mongoose.Document;
export declare class Canceled {
    status: number;
    message: string;
    renew: Renew;
}
export declare const CanceledSchema: mongoose.Schema<mongoose.Document<Canceled, {}>, mongoose.Model<any, any>, undefined>;
