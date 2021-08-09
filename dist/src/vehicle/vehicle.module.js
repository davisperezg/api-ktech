"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleModule = void 0;
const common_1 = require("@nestjs/common");
const vehicle_resolver_1 = require("./resolvers/vehicle.resolver");
const vehicle_service_1 = require("./services/vehicle.service");
const mongoose_1 = require("@nestjs/mongoose");
const vehicle_schema_1 = require("./schemas/vehicle.schema");
const device_schema_1 = require("../device/schemas/device.schema");
const billing_schema_1 = require("../billing/schemas/billing.schema");
const customer_schema_1 = require("../../customer/schemas/customer.schema");
const customer_service_1 = require("../../customer/services/customer.service");
const device_service_1 = require("../device/services/device.service");
const billing_service_1 = require("../billing/services/billing.service");
let VehicleModule = class VehicleModule {
};
VehicleModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Vehicle', schema: vehicle_schema_1.VehicleSchema },
                { name: 'Device', schema: device_schema_1.DeviceSchema },
                { name: 'Billing', schema: billing_schema_1.BillingSchema },
                { name: 'Customer', schema: customer_schema_1.CustomerSchema },
            ]),
        ],
        providers: [
            vehicle_resolver_1.VehicleResolver,
            vehicle_service_1.VehicleService,
            device_service_1.DeviceService,
            billing_service_1.BillingService,
            customer_service_1.CustomerService,
        ],
    })
], VehicleModule);
exports.VehicleModule = VehicleModule;
//# sourceMappingURL=vehicle.module.js.map