import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { CategoryService } from 'src/category/services/category.service';
import { CreateServiceInput } from '../dto/inputs/create-service.input';
import { UpdateServiceInput } from '../dto/inputs/update-service.input';
import { ServiceDocument } from '../schemas/service.schema';
export declare class ServiceService implements OnModuleInit {
    private readonly serviceModel;
    private readonly categoryService;
    constructor(serviceModel: Model<ServiceDocument>, categoryService: CategoryService);
    onModuleInit(): Promise<void>;
    createService(serviceInput: CreateServiceInput): Promise<ServiceDocument>;
    updateService(serviceInput: UpdateServiceInput): Promise<ServiceDocument>;
    deleteServiceById(id: string): Promise<boolean>;
    findAllServices(): Promise<ServiceDocument[]>;
    findOneServicesById(id: string): Promise<ServiceDocument>;
    findOneServiceByName(name: string, param: string): Promise<ServiceDocument>;
}
