import { ServiceService } from '../services/service.service';
import { Mutation, Query, Args, Resolver } from '@nestjs/graphql';
import { ServiceType } from '../dto/querys/service.type';
import { CreateServiceInput } from '../dto/inputs/create-service.input';
import { UpdateServiceInput } from '../dto/inputs/update-service.input';
import { ServiceDocument } from '../schemas/service.schema';

@Resolver()
export class ServiceResolver {
  constructor(private readonly serviceService: ServiceService) {}

  @Mutation(() => ServiceType)
  registerService(
    @Args({ name: 'serviceInput', type: () => CreateServiceInput })
    serviceInput: CreateServiceInput,
  ) {
    return this.serviceService.createService(serviceInput);
  }

  @Mutation(() => ServiceType)
  updateService(
    @Args({ name: 'serviceInput', type: () => UpdateServiceInput })
    serviceInput: UpdateServiceInput,
  ) {
    return this.serviceService.updateService(serviceInput);
  }

  @Query(() => [ServiceType])
  getServices(): Promise<ServiceDocument[]> {
    return this.serviceService.findAllServices();
  }
}
