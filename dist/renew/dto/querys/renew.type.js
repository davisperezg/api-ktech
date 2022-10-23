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
exports.RenewTypeCheck = exports.RenewType = void 0;
const graphql_1 = require("@nestjs/graphql");
const billing_type_1 = require("../../../billing/dto/querys/billing.type");
const user_type_1 = require("../../../user/dto/querys/user.type");
const vehicle_type_1 = require("../../../vehicle/dto/querys/vehicle.type");
let RenewType = class RenewType {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], RenewType.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => vehicle_type_1.VehicleType, { nullable: true }),
    __metadata("design:type", vehicle_type_1.VehicleType)
], RenewType.prototype, "vehicle", void 0);
__decorate([
    graphql_1.Field(() => billing_type_1.BillingType, { nullable: true }),
    __metadata("design:type", billing_type_1.BillingType)
], RenewType.prototype, "billing", void 0);
__decorate([
    graphql_1.Field(() => user_type_1.UserType, { nullable: true }),
    __metadata("design:type", user_type_1.UserType)
], RenewType.prototype, "registeredBy", void 0);
__decorate([
    graphql_1.Field(() => user_type_1.UserType, { nullable: true }),
    __metadata("design:type", user_type_1.UserType)
], RenewType.prototype, "updatedBy", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], RenewType.prototype, "expirationDate", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], RenewType.prototype, "renovationStart", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], RenewType.prototype, "renovationEnd", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], RenewType.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], RenewType.prototype, "updatedAt", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], RenewType.prototype, "billingPayToday", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], RenewType.prototype, "billingDes", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], RenewType.prototype, "status", void 0);
RenewType = __decorate([
    graphql_1.ObjectType()
], RenewType);
exports.RenewType = RenewType;
let RenewTypeCheck = class RenewTypeCheck {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], RenewTypeCheck.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], RenewTypeCheck.prototype, "status", void 0);
RenewTypeCheck = __decorate([
    graphql_1.ObjectType()
], RenewTypeCheck);
exports.RenewTypeCheck = RenewTypeCheck;
//# sourceMappingURL=renew.type.js.map