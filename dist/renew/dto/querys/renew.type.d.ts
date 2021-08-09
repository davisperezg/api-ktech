import { BillingType } from 'src/billing/dto/querys/billing.type';
import { UserType } from 'src/user/dto/querys/user.type';
import { VehicleType } from 'src/vehicle/dto/querys/vehicle.type';
export declare class RenewType {
    id: string;
    vehicle: VehicleType;
    billing: BillingType;
    registeredBy: UserType;
    updatedBy: UserType;
    expirationDate: Date;
    renovationStart: Date;
    renovationEnd: Date;
    createdAt: Date;
    updatedAt: Date;
}
