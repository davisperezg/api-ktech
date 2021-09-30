import { Model } from 'mongoose';
import { BillingService } from 'src/billing/services/billing.service';
import { UserService } from 'src/user/services/user.service';
import { VehicleService } from 'src/vehicle/services/vehicle.service';
import { CreateRenewInput } from '../dto/inputs/create-renew.input';
import { RenewDocument } from '../schemas/renew.schema';
export declare class RenewService {
    private readonly renewModel;
    private readonly userService;
    private readonly vehicleService;
    private readonly billingService;
    constructor(renewModel: Model<RenewDocument>, userService: UserService, vehicleService: VehicleService, billingService: BillingService);
    createRenew(renewInput: CreateRenewInput, user: string): Promise<RenewDocument>;
    findAllRenews(): Promise<RenewDocument[]>;
    buscarRenovacionesXFecha(desde: Date | string, hasta: Date | string): Promise<RenewDocument[]>;
}
