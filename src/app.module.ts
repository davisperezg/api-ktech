import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ModulesModule } from './modules/modules.module';
import { AccessModule } from './access/access.module';
import { MenuModule } from './menu/menu.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { ModelModule } from './model/model.module';
import { ProductModule } from './product/product.module';
import { ServiceModule } from './service/service.module';
import { IngressModule } from './ingress/ingress.module';
import { EgressModule } from './egress/egress.module';
import { url_mongo } from './config/config';
import { CustomerModule } from './customer/customer.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { DeviceModule } from './device/device.module';
import { BillingModule } from './billing/billing.module';
import { RenewModule } from './renew/renew.module';
import { SExtModule } from './services-ext/sext.module';
import { RenewsCanceledModule } from './renews-canceled/renews-canceled.module';
//mongodb://localhost

@Module({
  imports: [
    MongooseModule.forRoot(url_mongo, {
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
    }),
    AccessModule,
    MenuModule,
    ModulesModule,
    RoleModule,
    UserModule,
    AuthModule,
    CategoryModule,
    BrandModule,
    ModelModule,
    ProductModule,
    ServiceModule,
    IngressModule,
    EgressModule,
    CustomerModule,
    VehicleModule,
    DeviceModule,
    BillingModule,
    RenewModule,
    SExtModule,
    RenewsCanceledModule,
  ],
})
export class AppModule {}
