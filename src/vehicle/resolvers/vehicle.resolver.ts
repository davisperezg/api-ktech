import { Mutation, Query, Args, Resolver } from '@nestjs/graphql';
import { CreateVehicleInput } from '../dto/inputs/create-vehicle.input';
import { UpdateVehicleInput } from '../dto/inputs/update-vehicle.input';
import { VehicleType } from '../dto/querys/vehicle.type';
import { VehicleDocument } from '../schemas/vehicle.schema';
import { VehicleService } from '../services/vehicle.service';
import { GqlAuthGuard } from '../../lib/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
@UseGuards(GqlAuthGuard)
export class VehicleResolver {
  constructor(private readonly vehicleService: VehicleService) {}

  @Mutation(() => VehicleType)
  registerVehicle(
    @Args({ name: 'vehicleInput', type: () => CreateVehicleInput })
    vehicleInput: CreateVehicleInput,
  ) {
    return this.vehicleService.createVehicle(vehicleInput);
  }

  @Mutation(() => VehicleType)
  updateVehicle(
    @Args({ name: 'vehicleInput', type: () => UpdateVehicleInput })
    vehicleInput: UpdateVehicleInput,
  ) {
    return this.vehicleService.updateVehicle(vehicleInput);
  }

  @Mutation(() => Boolean)
  deleteVehicle(@Args('id') id: string) {
    return this.vehicleService.deleteVehicleById(id);
  }

  @Query(() => [VehicleType])
  getVehicles(): Promise<VehicleDocument[]> {
    return this.vehicleService.findAllVehicle();
  }
}
