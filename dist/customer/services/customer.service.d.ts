import { Model } from 'mongoose';
import { CreateCustomerInput } from '../dto/inputs/create-customer.input';
import { UpdateCustomerInput } from '../dto/inputs/update-customer.input';
import { CustomerDocument } from '../schemas/customer.schema';
export declare class CustomerService {
    private readonly customerModel;
    constructor(customerModel: Model<CustomerDocument>);
    createCustomer(customerInput: CreateCustomerInput): Promise<CustomerDocument>;
    updateCustomer(customerInput: UpdateCustomerInput): Promise<CustomerDocument>;
    deleteCustomer(id: string): Promise<boolean>;
    findAllCustomer(): Promise<CustomerDocument[]>;
    findOneCustomerById(id: string): Promise<CustomerDocument>;
    findOneCustomerByNroDocument(number: string): Promise<CustomerDocument>;
    findOneCustomerByLastname(lastName: string, param: string): Promise<CustomerDocument>;
}
