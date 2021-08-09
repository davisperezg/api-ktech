"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenewModule = void 0;
const common_1 = require("@nestjs/common");
const billing_schema_1 = require("../billing/schemas/billing.schema");
const billing_service_1 = require("../billing/services/billing.service");
const vehicle_schema_1 = require("../vehicle/schemas/vehicle.schema");
const vehicle_service_1 = require("../vehicle/services/vehicle.service");
const renew_resolver_1 = require("./resolvers/renew.resolver");
const renew_schema_1 = require("./schemas/renew.schema");
const renew_service_1 = require("./services/renew.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/schemas/user.schema");
const user_service_1 = require("../user/services/user.service");
const customer_schema_1 = require("../../customer/schemas/customer.schema");
const customer_service_1 = require("../../customer/services/customer.service");
const device_schema_1 = require("../device/schemas/device.schema");
const device_service_1 = require("../device/services/device.service");
const role_schema_1 = require("../role/schemas/role.schema");
const role_service_1 = require("../role/services/role.service");
const module_service_1 = require("../modules/services/module.service");
const module_schema_1 = require("../modules/schemas/module.schema");
const access_service_1 = require("../access/services/access.service");
const access_schema_1 = require("../access/schemas/access.schema");
const menu_schema_1 = require("../menu/schemas/menu.schema");
const menu_service_1 = require("../menu/services/menu.service");
let RenewModule = class RenewModule {
};
RenewModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Vehicle', schema: vehicle_schema_1.VehicleSchema },
                { name: 'Billing', schema: billing_schema_1.BillingSchema },
                { name: 'Renew', schema: renew_schema_1.RenewSchema },
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: 'Customer', schema: customer_schema_1.CustomerSchema },
                { name: 'Device', schema: device_schema_1.DeviceSchema },
                { name: 'Role', schema: role_schema_1.RoleSchema },
                { name: 'Module', schema: module_schema_1.ModuleSchema },
                { name: 'Access', schema: access_schema_1.AccessSchema },
                { name: 'Menu', schema: menu_schema_1.MenuSchema },
            ]),
        ],
        providers: [
            renew_resolver_1.RenewResolver,
            renew_service_1.RenewService,
            vehicle_service_1.VehicleService,
            billing_service_1.BillingService,
            user_service_1.UserService,
            customer_service_1.CustomerService,
            device_service_1.DeviceService,
            role_service_1.RoleService,
            module_service_1.ModuleService,
            access_service_1.AccessService,
            menu_service_1.MenuService,
        ],
    })
], RenewModule);
exports.RenewModule = RenewModule;
//# sourceMappingURL=renew.module.js.map