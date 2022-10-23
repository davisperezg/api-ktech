import { RenewService } from '../services/renew.service';
import { CreateRenewInput } from '../dto/inputs/create-renew.input';
import { UserDocument } from 'src/user/schemas/user.schema';
import { RenewDocument } from '../schemas/renew.schema';
import { UpdateRenewInput } from '../dto/inputs/update-renew.input';
export declare class RenewResolver {
    private readonly renewService;
    constructor(renewService: RenewService);
    registerRenew(renewInput: CreateRenewInput, user: UserDocument): Promise<RenewDocument>;
    getRenews(): Promise<RenewDocument[]>;
    getVehiculosRenovadosXFecha(desde: Date, hasta: Date): Promise<RenewDocument[]>;
    getRenewById(id: string): Promise<RenewDocument>;
    getRenewByPlate(id: string): Promise<RenewDocument[]>;
    toCheck(renewInput: UpdateRenewInput): Promise<RenewDocument>;
}
