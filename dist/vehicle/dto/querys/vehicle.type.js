"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleType = void 0;
const graphql_1 = require("@nestjs/graphql");
const billing_type_1 = require("../../../billing/dto/querys/billing.type");
const customer_type_1 = require("../../../customer/dto/querys/customer.type");
const device_type_1 = require("../../../device/dto/querys/device.type");
let VehicleType = class VehicleType {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], VehicleType.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => customer_type_1.CustomerType, { nullable: true }),
    __metadata("design:type", customer_type_1.CustomerType)
], VehicleType.prototype, "customer", void 0);
__decorate([
    graphql_1.Field(() => device_type_1.DeviceType, { nullable: true }),
    __metadata("design:type", device_type_1.DeviceType)
], VehicleType.prototype, "device", void 0);
__decorate([
    graphql_1.Field(() => billing_type_1.BillingType, { nullable: true }),
    __metadata("design:type", billing_type_1.BillingType)
], VehicleType.prototype, "billing", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], VehicleType.prototype, "plate", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], VehicleType.prototype, "nroGPS", void 0);
__decorate([
    graphql_1.Field(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], VehicleType.prototype, "billigStart", void 0);
__decorate([
    graphql_1.Field(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], VehicleType.prototype, "billigEnd", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], VehicleType.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], VehicleType.prototype, "updatedAt", void 0);
VehicleType = __decorate([
    graphql_1.ObjectType()
], VehicleType);
exports.VehicleType = VehicleType;
//# sourceMappingURL=vehicle.type.js.map