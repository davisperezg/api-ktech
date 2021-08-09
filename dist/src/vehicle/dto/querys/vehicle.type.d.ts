import { BillingType } from 'src/billing/dto/querys/billing.type';
import { CustomerType } from 'customer/dto/querys/customer.type';
import { DeviceType } from 'src/device/dto/querys/device.type';
export declare class VehicleType {
    id: string;
    customer: CustomerType;
    device: DeviceType;
    billing: BillingType;
    plate: string;
    nroGPS: string;
    billigStart: Date;
    billigEnd: Date;
    createdAt: Date;
    updatedAt: Date;
}
