import { Model } from 'mongoose';
import { BillingService } from 'src/billing/services/billing.service';
import { CustomerService } from 'src/customer/services/customer.service';
import { DeviceService } from 'src/device/services/device.service';
import { CreateVehicleInput } from '../dto/inputs/create-vehicle.input';
import { UpdateVehicleInput } from '../dto/inputs/update-vehicle.input';
import { VehicleDocument } from '../schemas/vehicle.schema';
export declare class VehicleService {
    private readonly vehicleModel;
    private readonly customerService;
    private readonly deviceService;
    private readonly billingService;
    constructor(vehicleModel: Model<VehicleDocument>, customerService: CustomerService, deviceService: DeviceService, billingService: BillingService);
    createVehicle(vehicleInput: CreateVehicleInput): Promise<VehicleDocument>;
    updateVehicle(vehicleInput: UpdateVehicleInput | any): Promise<VehicleDocument>;
    findOneVehicleById(id: string): Promise<VehicleDocument>;
    deleteVehicleById(id: string): Promise<boolean>;
    findAllVehicle(): Promise<VehicleDocument[]>;
    findOneVehicleByPlate(plate: string, param: string): Promise<VehicleDocument>;
    findOneVehicleByNroGPS(nroGPS: string, param: string): Promise<VehicleDocument>;
}
