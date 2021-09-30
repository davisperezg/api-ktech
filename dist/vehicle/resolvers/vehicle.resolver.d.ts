import { CreateVehicleInput } from '../dto/inputs/create-vehicle.input';
import { UpdateVehicleInput } from '../dto/inputs/update-vehicle.input';
import { VehicleDocument } from '../schemas/vehicle.schema';
import { VehicleService } from '../services/vehicle.service';
import { UserDocument } from 'src/user/schemas/user.schema';
export declare class VehicleResolver {
    private readonly vehicleService;
    constructor(vehicleService: VehicleService);
    registerVehicle(vehicleInput: CreateVehicleInput, user: UserDocument): Promise<VehicleDocument>;
    updateVehicle(vehicleInput: UpdateVehicleInput, user: UserDocument): Promise<VehicleDocument>;
    deleteVehicle(id: string): Promise<boolean>;
    getVehicles(): Promise<VehicleDocument[]>;
    getVehiculosInstaladosXrango(desde: Date, hasta: Date): Promise<VehicleDocument[]>;
    getVehiculosVencidosXFecha(desde: Date, hasta: Date): Promise<VehicleDocument[]>;
}
