import { Model } from 'mongoose';
import { CategoryService } from 'src/category/services/category.service';
import { CreateServiceInput } from '../dto/inputs/create-service.input';
import { UpdateServiceInput } from '../dto/inputs/update-service.input';
import { ServiceDocument } from '../schemas/service.schema';
export declare class ServiceService {
    private readonly serviceModel;
    private readonly categoryService;
    constructor(serviceModel: Model<ServiceDocument>, categoryService: CategoryService);
    createService(serviceInput: CreateServiceInput): Promise<ServiceDocument>;
    updateService(serviceInput: UpdateServiceInput): Promise<ServiceDocument>;
    findAllServices(): Promise<ServiceDocument[]>;
    findOneServicesById(id: string): Promise<ServiceDocument>;
    findOneServiceByName(name: string, param: string): Promise<ServiceDocument>;
}
