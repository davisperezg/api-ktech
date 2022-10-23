import { DeviceService } from '../services/device.service';
import { Mutation, Query, Args, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../lib/guards/gql-auth.guard';
import { DeviceType } from '../dto/querys/device.type';
import { CreateDeviceInput } from '../dto/inputs/create-device.input';
import { UpdateDeviceInput } from '../dto/inputs/update-device.input';
import { DeviceDocument } from '../schemas/device.schema';
import { ObjectID } from 'mongodb';

@Resolver()
@UseGuards(GqlAuthGuard)
export class DeviceResolver {
  constructor(private readonly deviceService: DeviceService) {}

  @Mutation(() => DeviceType)
  registerDevice(
    @Args({ name: 'deviceInput', type: () => CreateDeviceInput })
    deviceInput: CreateDeviceInput,
  ) {
    return this.deviceService.createDevice(deviceInput);
  }

  @Mutation(() => DeviceType)
  updateDevice(
    @Args({ name: 'deviceInput', type: () => UpdateDeviceInput })
    deviceInput: UpdateDeviceInput,
  ) {
    return this.deviceService.updateDevice(deviceInput);
  }

  @Mutation(() => Boolean)
  deleteDevice(@Args('id') id: string) {
    return this.deviceService.deleteDevice(id);
  }

  @Query(() => [DeviceType])
  getDevices(): Promise<DeviceDocument[]> {
    return this.deviceService.findAllDevice();
  }

  @Query(() => DeviceType)
  getDevice(@Args('id') id: string): Promise<DeviceDocument> {
    return this.deviceService.findOneDeviceById(id);
  }
}
