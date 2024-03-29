import * as mongoose from 'mongoose';
export declare type DeviceDocument = Device & mongoose.Document;
export declare class Device {
    name: string;
    commands?: string;
    commandsclient?: string;
    reference?: string;
    status: number;
}
export declare const DeviceSchema: mongoose.Schema<mongoose.Document<Device, {}>, mongoose.Model<any, any>, undefined>;
