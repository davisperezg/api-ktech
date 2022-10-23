import { UpdateCanceledInput } from '../dto/inputs/update-canceled.input';
import { CreateCanceledInput } from '../dto/inputs/create-canceled.input';
import { CanceledDocument } from '../schemas/canceled.schema';
import { CanceledService } from '../services/canceled.service';
export declare class CanceledResolver {
    private readonly canceledService;
    constructor(canceledService: CanceledService);
    registerCanceled(canceledInput: CreateCanceledInput): Promise<CanceledDocument>;
    updateCanceled(canceledInput: UpdateCanceledInput): Promise<CanceledDocument>;
    getCanceled(id: string): Promise<CanceledDocument>;
}
