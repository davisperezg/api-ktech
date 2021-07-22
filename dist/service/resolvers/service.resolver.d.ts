import { ServiceService } from '../services/service.service';
import { CreateServiceInput } from '../dto/inputs/create-service.input';
import { UpdateServiceInput } from '../dto/inputs/update-service.input';
import { ServiceDocument } from '../schemas/service.schema';
export declare class ServiceResolver {
    private readonly serviceService;
    constructor(serviceService: ServiceService);
    registerService(serviceInput: CreateServiceInput): Promise<ServiceDocument>;
    updateService(serviceInput: UpdateServiceInput): Promise<ServiceDocument>;
    getServices(): Promise<ServiceDocument[]>;
}
