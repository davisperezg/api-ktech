import * as mongoose from 'mongoose';
import { Billing } from 'src/billing/schemas/billing.schema';
import { Customer } from 'src/customer/schemas/customer.schema';
import { Device } from 'src/device/schemas/device.schema';
export declare type VehicleDocument = Vehicle & mongoose.Document;
export declare class Vehicle {
    customer: Customer;
    device: Device;
    billing: Billing;
    plate: string;
    nroGPS: string;
    billigStart: Date;
    billigEnd: Date;
    status: number;
}
export declare const VehicleSchema: mongoose.Schema<mongoose.Document<Vehicle, {}>, mongoose.Model<any, any>, undefined>;
