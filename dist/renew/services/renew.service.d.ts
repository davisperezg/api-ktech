import { Model } from 'mongoose';
import { BillingService } from 'src/billing/services/billing.service';
import { UserService } from 'src/user/services/user.service';
import { VehicleService } from 'src/vehicle/services/vehicle.service';
import { CreateRenewInput } from '../dto/inputs/create-renew.input';
import { RenewDocument } from '../schemas/renew.schema';
import { UpdateRenewInput } from '../dto/inputs/update-renew.input';
import { CanceledService } from 'src/renews-canceled/services/canceled.service';
export declare class RenewService {
    private readonly renewModel;
    private readonly userService;
    private readonly vehicleService;
    private readonly billingService;
    private readonly canceledService;
    constructor(renewModel: Model<RenewDocument>, userService: UserService, vehicleService: VehicleService, billingService: BillingService, canceledService: CanceledService);
    createRenew(renewInput: CreateRenewInput, user: string): Promise<RenewDocument>;
    toCheck(renewInput: UpdateRenewInput): Promise<RenewDocument>;
    findAllRenews(): Promise<RenewDocument[]>;
    findAllRenewsById(id: string): Promise<RenewDocument>;
    findAllRenewsByVehicle(id: string): Promise<RenewDocument[]>;
    buscarRenovacionesXFecha(desde: Date | string, hasta: Date | string): Promise<RenewDocument[]>;
}
