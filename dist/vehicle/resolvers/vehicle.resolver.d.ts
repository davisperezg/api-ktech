import { CreateVehicleInput } from '../dto/inputs/create-vehicle.input';
import { UpdateVehicleInput } from '../dto/inputs/update-vehicle.input';
import { VehicleDocument } from '../schemas/vehicle.schema';
import { VehicleService } from '../services/vehicle.service';
export declare class VehicleResolver {
    private readonly vehicleService;
    constructor(vehicleService: VehicleService);
    registerVehicle(vehicleInput: CreateVehicleInput): Promise<VehicleDocument>;
    updateVehicle(vehicleInput: UpdateVehicleInput): Promise<VehicleDocument>;
    deleteVehicle(id: string): Promise<boolean>;
    getVehicles(): Promise<VehicleDocument[]>;
}
