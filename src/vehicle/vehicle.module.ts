import { Module } from '@nestjs/common';
import { VehicleResolver } from './resolvers/vehicle.resolver';
import { VehicleService } from './services/vehicle.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleSchema } from './schemas/vehicle.schema';
import { DeviceSchema } from 'src/device/schemas/device.schema';
import { BillingSchema } from 'src/billing/schemas/billing.schema';
import { CustomerSchema } from 'src/customer/schemas/customer.schema';
import { CustomerService } from 'src/customer/services/customer.service';
import { DeviceService } from 'src/device/services/device.service';
import { BillingService } from 'src/billing/services/billing.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Vehicle', schema: VehicleSchema },
      { name: 'Device', schema: DeviceSchema },
      { name: 'Billing', schema: BillingSchema },
      { name: 'Customer', schema: CustomerSchema },
    ]),
  ],
  providers: [
    VehicleResolver,
    VehicleService,
    DeviceService,
    BillingService,
    CustomerService,
  ],
})
export class VehicleModule {}
