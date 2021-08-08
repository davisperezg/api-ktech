import * as mongoose from 'mongoose';
export declare type CustomerDocument = Customer & mongoose.Document;
export declare class Customer {
    name: string;
    lastName: string;
    document: string;
    numDocument: string;
    cellphone_1: string;
    cellphone_2?: string;
    direction?: string;
    username: string;
    password: string;
    status: number;
}
export declare const CustomerSchema: mongoose.Schema<mongoose.Document<Customer, {}>, mongoose.Model<any, any>, undefined>;
