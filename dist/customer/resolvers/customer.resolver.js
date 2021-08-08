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
exports.CustomerResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../../lib/guards/gql-auth.guard");
const customer_service_1 = require("../services/customer.service");
const customer_type_1 = require("../dto/querys/customer.type");
const create_customer_input_1 = require("../dto/inputs/create-customer.input");
const update_customer_input_1 = require("../dto/inputs/update-customer.input");
let CustomerResolver = class CustomerResolver {
    constructor(customerService) {
        this.customerService = customerService;
    }
    registerCustomer(customerInput) {
        return this.customerService.createCustomer(customerInput);
    }
    updateCustomer(customerIput) {
        return this.customerService.updateCustomer(customerIput);
    }
    deleteCustomer(id) {
        return this.customerService.deleteCustomer(id);
    }
    getCustomer() {
        return this.customerService.findAllCustomer();
    }
};
__decorate([
    graphql_1.Mutation(() => customer_type_1.CustomerType),
    __param(0, graphql_1.Args({ name: 'customerInput', type: () => create_customer_input_1.CreateCustomerInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_input_1.CreateCustomerInput]),
    __metadata("design:returntype", void 0)
], CustomerResolver.prototype, "registerCustomer", null);
__decorate([
    graphql_1.Mutation(() => customer_type_1.CustomerType),
    __param(0, graphql_1.Args({ name: 'customerInput', type: () => update_customer_input_1.UpdateCustomerInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_customer_input_1.UpdateCustomerInput]),
    __metadata("design:returntype", void 0)
], CustomerResolver.prototype, "updateCustomer", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomerResolver.prototype, "deleteCustomer", null);
__decorate([
    graphql_1.Query(() => [customer_type_1.CustomerType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "getCustomer", null);
CustomerResolver = __decorate([
    graphql_1.Resolver(),
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomerResolver);
exports.CustomerResolver = CustomerResolver;
//# sourceMappingURL=customer.resolver.js.map