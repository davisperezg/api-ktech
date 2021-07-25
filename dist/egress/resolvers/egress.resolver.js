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
exports.EgressResolver = void 0;
const egress_service_1 = require("../services/egress.service");
const graphql_1 = require("@nestjs/graphql");
const egress_type_1 = require("../dto/querys/egress.type");
const create_egress_input_1 = require("../dto/inputs/create-egress.input");
const update_egress_input_1 = require("../dto/inputs/update-egress.input");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../../lib/guards/gql-auth.guard");
let EgressResolver = class EgressResolver {
    constructor(egressService) {
        this.egressService = egressService;
    }
    registerEgress(egressInput) {
        return this.egressService.createEgress(egressInput);
    }
    updateEgress(egressInput) {
        return this.egressService.updateEgress(egressInput);
    }
    deleteEgress(id) {
        return this.egressService.deleteEgressById(id);
    }
    getEgress() {
        return this.egressService.findAllEgressToDay();
    }
};
__decorate([
    graphql_1.Mutation(() => egress_type_1.EgressType),
    __param(0, graphql_1.Args({ name: 'egressInput', type: () => create_egress_input_1.CreateEgressInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_egress_input_1.CreateEgressInput]),
    __metadata("design:returntype", void 0)
], EgressResolver.prototype, "registerEgress", null);
__decorate([
    graphql_1.Mutation(() => egress_type_1.EgressType),
    __param(0, graphql_1.Args({ name: 'egressInput', type: () => update_egress_input_1.UpdateEgressInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_egress_input_1.UpdateEgressInput]),
    __metadata("design:returntype", void 0)
], EgressResolver.prototype, "updateEgress", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EgressResolver.prototype, "deleteEgress", null);
__decorate([
    graphql_1.Query(() => [egress_type_1.EgressType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EgressResolver.prototype, "getEgress", null);
EgressResolver = __decorate([
    graphql_1.Resolver(),
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [egress_service_1.EgressService])
], EgressResolver);
exports.EgressResolver = EgressResolver;
//# sourceMappingURL=egress.resolver.js.map