import { CreateBillingInput } from '../dto/inputs/create-billing.input';
import { UpdateBillingInput } from '../dto/inputs/update-billing.input';
import { BillingDocument } from '../schemas/billing.schema';
import { BillingService } from '../services/billing.service';
export declare class BillingResolver {
    private readonly billingService;
    constructor(billingService: BillingService);
    registerBilling(billingInput: CreateBillingInput): Promise<BillingDocument>;
    updateBilling(billingInput: UpdateBillingInput): Promise<BillingDocument>;
    deleteBilling(id: string): Promise<boolean>;
    getBillings(): Promise<BillingDocument[]>;
}
