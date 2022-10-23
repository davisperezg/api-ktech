import { CanceledDocument } from '../schemas/canceled.schema';
import { CreateCanceledInput } from '../dto/inputs/create-canceled.input';
import { UpdateCanceledInput } from '../dto/inputs/update-canceled.input';
import { Model } from 'mongoose';
import { RenewDocument } from 'src/renew/schemas/renew.schema';
export declare class CanceledService {
    private readonly canceledModel;
    private readonly renewModel;
    constructor(canceledModel: Model<CanceledDocument>, renewModel: Model<RenewDocument>);
    createCanceled(canceledInput: CreateCanceledInput): Promise<CanceledDocument>;
    updateCanceled(canceledInput: UpdateCanceledInput): Promise<CanceledDocument>;
    findOneCanceledById(id: string): Promise<CanceledDocument>;
}
