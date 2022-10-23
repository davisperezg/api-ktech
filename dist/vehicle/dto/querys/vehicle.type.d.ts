import { BillingType } from 'src/billing/dto/querys/billing.type';
import { CustomerType } from 'src/customer/dto/querys/customer.type';
import { DeviceType } from 'src/device/dto/querys/device.type';
import { UserType } from 'src/user/dto/querys/user.type';
export declare class VehicleType {
    id: string;
    customer: CustomerType;
    device: DeviceType;
    billing: BillingType;
    createdBy: UserType;
    updatedBy: UserType;
    platform: string;
    plate: string;
    sim: string;
    nroGPS: string;
    billigStart: Date;
    billigEnd: Date;
    createdAt: Date;
    updatedAt: Date;
    retired: boolean;
}
