import * as mongoose from 'mongoose';
export declare type PlatformDocument = Platform & mongoose.Document;
export declare class Platform {
    name: string;
}
export declare const PlatformSchema: mongoose.Schema<mongoose.Document<Platform, {}>, mongoose.Model<any, any>, undefined>;
