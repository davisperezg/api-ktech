import { Module } from '@nestjs/common';
import { BillingSchema } from 'src/billing/schemas/billing.schema';
import { BillingService } from 'src/billing/services/billing.service';
import { VehicleSchema } from 'src/vehicle/schemas/vehicle.schema';
import { VehicleService } from 'src/vehicle/services/vehicle.service';
import { RenewResolver } from './resolvers/renew.resolver';
import { RenewSchema } from './schemas/renew.schema';
import { RenewService } from './services/renew.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/services/user.service';
import { CustomerSchema } from 'src/customer/schemas/customer.schema';
import { CustomerService } from 'src/customer/services/customer.service';
import { DeviceSchema } from 'src/device/schemas/device.schema';
import { DeviceService } from 'src/device/services/device.service';
import { RoleSchema } from 'src/role/schemas/role.schema';
import { RoleService } from 'src/role/services/role.service';
import { ModuleService } from 'src/modules/services/module.service';
import { ModuleSchema } from 'src/modules/schemas/module.schema';
import { AccessService } from 'src/access/services/access.service';
import { AccessSchema } from 'src/access/schemas/access.schema';
import { MenuSchema } from 'src/menu/schemas/menu.schema';
import { MenuService } from 'src/menu/services/menu.service';
import { CanceledSchema } from 'src/renews-canceled/schemas/canceled.schema';
import { CanceledService } from 'src/renews-canceled/services/canceled.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Vehicle', schema: VehicleSchema },
      { name: 'Billing', schema: BillingSchema },
      { name: 'Renew', schema: RenewSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Customer', schema: CustomerSchema },
      { name: 'Device', schema: DeviceSchema },
      { name: 'Role', schema: RoleSchema },
      { name: 'Module', schema: ModuleSchema },
      { name: 'Access', schema: AccessSchema },
      { name: 'Menu', schema: MenuSchema },
      { name: 'Canceled', schema: CanceledSchema },
    ]),
  ],
  providers: [
    RenewResolver,
    RenewService,
    VehicleService,
    BillingService,
    UserService,
    CustomerService,
    DeviceService,
    RoleService,
    ModuleService,
    AccessService,
    MenuService,
    CanceledService,
  ],
})
export class RenewModule {}
