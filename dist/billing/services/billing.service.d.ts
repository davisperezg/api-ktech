import { Model } from 'mongoose';
import { CreateBillingInput } from '../dto/inputs/create-billing.input';
import { UpdateBillingInput } from '../dto/inputs/update-billing.input';
import { BillingDocument } from '../schemas/billing.schema';
export declare class BillingService {
    private readonly billingModel;
    constructor(billingModel: Model<BillingDocument>);
    createBilling(billingInput: CreateBillingInput): Promise<BillingDocument>;
    updateBilling(billingInput: UpdateBillingInput): Promise<BillingDocument>;
    deleteBilling(id: string): Promise<boolean>;
    findAllBilling(): Promise<BillingDocument[]>;
    findOneBillingById(id: string): Promise<BillingDocument>;
    findOneBillingByName(name: string, param: string): Promise<BillingDocument>;
}
