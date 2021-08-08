import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { CreateBillingInput } from '../dto/inputs/create-billing.input';
import { UpdateBillingInput } from '../dto/inputs/update-billing.input';
import { BillingType } from '../dto/querys/billing.type';
import { BillingDocument } from '../schemas/billing.schema';
import { BillingService } from '../services/billing.service';

@Resolver()
export class BillingResolver {
  constructor(private readonly billingService: BillingService) {}

  @Mutation(() => BillingType)
  registerBilling(
    @Args({ name: 'billingInput', type: () => CreateBillingInput })
    billingInput: CreateBillingInput,
  ) {
    return this.billingService.createBilling(billingInput);
  }

  @Mutation(() => BillingType)
  updateBilling(
    @Args({ name: 'billingInput', type: () => UpdateBillingInput })
    billingInput: UpdateBillingInput,
  ) {
    return this.billingService.updateBilling(billingInput);
  }

  @Mutation(() => Boolean)
  deleteBilling(@Args('id') id: string) {
    return this.billingService.deleteBilling(id);
  }

  @Query(() => [BillingType])
  getBillings(): Promise<BillingDocument[]> {
    return this.billingService.findAllBilling();
  }
}
