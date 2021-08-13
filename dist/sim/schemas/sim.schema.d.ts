import * as mongoose from 'mongoose';
export declare type SimDocument = Sim & mongoose.Document;
export declare class Sim {
    name: string;
    link: string;
}
export declare const SimSchema: mongoose.Schema<mongoose.Document<Sim, {}>, mongoose.Model<any, any>, undefined>;
