import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../lib/guards/gql-auth.guard';
import { CustomerService } from '../services/customer.service';
import { CustomerType } from '../dto/querys/customer.type';
import { CreateCustomerInput } from '../dto/inputs/create-customer.input';
import { UpdateCustomerInput } from '../dto/inputs/update-customer.input';
import { CustomerDocument } from '../schemas/customer.schema';

@Resolver()
@UseGuards(GqlAuthGuard)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Mutation(() => CustomerType)
  registerCustomer(
    @Args({ name: 'customerInput', type: () => CreateCustomerInput })
    customerInput: CreateCustomerInput,
  ) {
    return this.customerService.createCustomer(customerInput);
  }

  @Mutation(() => CustomerType)
  updateCustomer(
    @Args({ name: 'customerInput', type: () => UpdateCustomerInput })
    customerIput: UpdateCustomerInput,
  ) {
    return this.customerService.updateCustomer(customerIput);
  }

  @Mutation(() => Boolean)
  deleteCustomer(@Args('id') id: string) {
    return this.customerService.deleteCustomer(id);
  }

  @Query(() => [CustomerType])
  getCustomer(): Promise<CustomerDocument[]> {
    return this.customerService.findAllCustomer();
  }
}
