import { EgressDocument } from '../schemas/egress.schema';
import { EgressService } from '../services/egress.service';
import { CreateEgressInput } from '../dto/inputs/create-egress.input';
import { UpdateEgressInput } from '../dto/inputs/update-egress.input';
export declare class EgressResolver {
    private readonly egressService;
    constructor(egressService: EgressService);
    registerEgress(egressInput: CreateEgressInput): Promise<EgressDocument>;
    updateEgress(egressInput: UpdateEgressInput): Promise<EgressDocument>;
    deleteEgress(id: string): Promise<boolean>;
    getEgress(): Promise<EgressDocument[]>;
    getEgressByDates(start: string, end: string): Promise<EgressDocument[]>;
}
