import * as mongoose from 'mongoose';
import { Billing } from 'src/billing/schemas/billing.schema';
import { User } from 'src/user/schemas/user.schema';
import { Vehicle } from 'src/vehicle/schemas/vehicle.schema';
export declare type RenewDocument = Renew & mongoose.Document;
export declare class Renew {
    vehicle: Vehicle;
    billing: Billing;
    registeredBy: User;
    updatedBy: User;
    expirationDate: Date;
    renovationStart: Date;
    renovationEnd: Date;
    status: number;
    billingPayToday: string;
    billingDes: string;
    billingTime: [];
}
export declare const RenewSchema: mongoose.Schema<mongoose.Document<Renew, {}>, mongoose.Model<any, any>, undefined>;
