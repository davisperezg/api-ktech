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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const conts_1 = require("../../lib/conts");
const create_billing_input_1 = require("../dto/inputs/create-billing.input");
const update_billing_input_1 = require("../dto/inputs/update-billing.input");
const billing_type_1 = require("../dto/querys/billing.type");
const billing_service_1 = require("../services/billing.service");
let BillingResolver = class BillingResolver {
    constructor(billingService) {
        this.billingService = billingService;
    }
    registerBilling(billingInput) {
        return this.billingService.createBilling(billingInput);
    }
    updateBilling(billingInput) {
        return this.billingService.updateBilling(billingInput);
    }
    deleteBilling(id) {
        return this.billingService.deleteBilling(id);
    }
    getBillings() {
        return this.billingService.findAllBilling();
    }
    getBillingByName(name) {
        return this.billingService.findOneBillingByName(name, conts_1.NOEXIST);
    }
};
__decorate([
    graphql_1.Mutation(() => billing_type_1.BillingType),
    __param(0, graphql_1.Args({ name: 'billingInput', type: () => create_billing_input_1.CreateBillingInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_billing_input_1.CreateBillingInput]),
    __metadata("design:returntype", void 0)
], BillingResolver.prototype, "registerBilling", null);
__decorate([
    graphql_1.Mutation(() => billing_type_1.BillingType),
    __param(0, graphql_1.Args({ name: 'billingInput', type: () => update_billing_input_1.UpdateBillingInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_billing_input_1.UpdateBillingInput]),
    __metadata("design:returntype", void 0)
], BillingResolver.prototype, "updateBilling", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BillingResolver.prototype, "deleteBilling", null);
__decorate([
    graphql_1.Query(() => [billing_type_1.BillingType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BillingResolver.prototype, "getBillings", null);
__decorate([
    graphql_1.Query(() => billing_type_1.BillingType),
    __param(0, graphql_1.Args('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillingResolver.prototype, "getBillingByName", null);
BillingResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [billing_service_1.BillingService])
], BillingResolver);
exports.BillingResolver = BillingResolver;
//# sourceMappingURL=billing.resolver.js.map