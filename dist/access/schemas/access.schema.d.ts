import * as mongoose from 'mongoose';
export declare type AccessDocument = Access & mongoose.Document;
export declare class Access {
    name?: string;
}
export declare const AccessSchema: mongoose.Schema<mongoose.Document<Access, {}>, mongoose.Model<any, any>, undefined>;
