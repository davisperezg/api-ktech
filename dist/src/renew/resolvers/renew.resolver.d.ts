import { RenewService } from '../services/renew.service';
import { CreateRenewInput } from '../dto/inputs/create-renew.input';
import { UserDocument } from 'src/user/schemas/user.schema';
import { RenewDocument } from '../schemas/renew.schema';
export declare class RenewResolver {
    private readonly renewService;
    constructor(renewService: RenewService);
    registerRenew(renewInput: CreateRenewInput, user: UserDocument): Promise<RenewDocument>;
    getRenews(): Promise<RenewDocument[]>;
}
