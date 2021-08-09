"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const role_module_1 = require("./role/role.module");
const mongoose_1 = require("@nestjs/mongoose");
const modules_module_1 = require("./modules/modules.module");
const access_module_1 = require("./access/access.module");
const menu_module_1 = require("./menu/menu.module");
const category_module_1 = require("./category/category.module");
const brand_module_1 = require("./brand/brand.module");
const model_module_1 = require("./model/model.module");
const product_module_1 = require("./product/product.module");
const service_module_1 = require("./service/service.module");
const ingress_module_1 = require("./ingress/ingress.module");
const egress_module_1 = require("./egress/egress.module");
const config_1 = require("./config/config");
const customer_module_1 = require("./customer/customer.module");
const vehicle_module_1 = require("./vehicle/vehicle.module");
const device_module_1 = require("./device/device.module");
const billing_module_1 = require("./billing/billing.module");
const renew_module_1 = require("./renew/renew.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRoot(config_1.url_mongo, {
                useFindAndModify: false,
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: true,
                playground: true,
            }),
            access_module_1.AccessModule,
            menu_module_1.MenuModule,
            modules_module_1.ModulesModule,
            role_module_1.RoleModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            category_module_1.CategoryModule,
            brand_module_1.BrandModule,
            model_module_1.ModelModule,
            product_module_1.ProductModule,
            service_module_1.ServiceModule,
            ingress_module_1.IngressModule,
            egress_module_1.EgressModule,
            customer_module_1.CustomerModule,
            vehicle_module_1.VehicleModule,
            device_module_1.DeviceModule,
            billing_module_1.BillingModule,
            renew_module_1.RenewModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map