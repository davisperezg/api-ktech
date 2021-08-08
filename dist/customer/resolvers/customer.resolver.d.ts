import { CustomerService } from '../services/customer.service';
import { CreateCustomerInput } from '../dto/inputs/create-customer.input';
import { UpdateCustomerInput } from '../dto/inputs/update-customer.input';
import { CustomerDocument } from '../schemas/customer.schema';
export declare class CustomerResolver {
    private readonly customerService;
    constructor(customerService: CustomerService);
    registerCustomer(customerInput: CreateCustomerInput): Promise<CustomerDocument>;
    updateCustomer(customerIput: UpdateCustomerInput): Promise<CustomerDocument>;
    deleteCustomer(id: string): Promise<boolean>;
    getCustomer(): Promise<CustomerDocument[]>;
}
