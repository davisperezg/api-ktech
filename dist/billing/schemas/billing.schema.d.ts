import * as mongoose from 'mongoose';
export declare type BillingDocument = Billing & mongoose.Document;
export declare class Billing {
    name: string;
    day: number;
    status: number;
    price: number;
}
export declare const BillingSchema: mongoose.Schema<mongoose.Document<Billing, {}>, mongoose.Model<any, any>, undefined>;
