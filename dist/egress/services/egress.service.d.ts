import { EgressDocument } from '../schemas/egress.schema';
import { Model } from 'mongoose';
import { CreateEgressInput } from '../dto/inputs/create-egress.input';
import { CategoryService } from 'src/category/services/category.service';
import { UpdateEgressInput } from '../dto/inputs/update-egress.input';
export declare class EgressService {
    private readonly egressModel;
    private readonly categoryService;
    constructor(egressModel: Model<EgressDocument>, categoryService: CategoryService);
    createEgress(egressInput: CreateEgressInput): Promise<EgressDocument>;
    updateEgress(egressInput: UpdateEgressInput): Promise<EgressDocument>;
    deleteEgressById(id: string): Promise<boolean>;
    findAllEgress(): Promise<EgressDocument[]>;
    findOneEgressById(id: string): Promise<EgressDocument>;
}
