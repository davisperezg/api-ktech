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
exports.IngressResolver = void 0;
const ingress_service_1 = require("../services/ingress.service");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../../lib/guards/gql-auth.guard");
const create_ingress_input_1 = require("../dto/inputs/create-ingress.input");
const ingress_type_1 = require("../dto/querys/ingress.type");
const update_ingress_input_1 = require("../dto/inputs/update-ingress.input");
let IngressResolver = class IngressResolver {
    constructor(ingressService) {
        this.ingressService = ingressService;
    }
    registerIngress(ingressInput) {
        return this.ingressService.createIngress(ingressInput);
    }
    updateIngress(ingressInput) {
        return this.ingressService.updateIngress(ingressInput);
    }
    deleteIngress(id) {
        return this.ingressService.deleteIngressById(id);
    }
    getIngress() {
        return this.ingressService.findAllIngressToDay();
    }
};
__decorate([
    graphql_1.Mutation(() => ingress_type_1.IngressType),
    __param(0, graphql_1.Args({ name: 'ingressInput', type: () => create_ingress_input_1.CreateIngressInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ingress_input_1.CreateIngressInput]),
    __metadata("design:returntype", void 0)
], IngressResolver.prototype, "registerIngress", null);
__decorate([
    graphql_1.Mutation(() => ingress_type_1.IngressType),
    __param(0, graphql_1.Args({ name: 'ingressInput', type: () => update_ingress_input_1.UpdateIngressInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_ingress_input_1.UpdateIngressInput]),
    __metadata("design:returntype", void 0)
], IngressResolver.prototype, "updateIngress", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IngressResolver.prototype, "deleteIngress", null);
__decorate([
    graphql_1.Query(() => [ingress_type_1.IngressType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IngressResolver.prototype, "getIngress", null);
IngressResolver = __decorate([
    graphql_1.Resolver(),
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [ingress_service_1.IngressService])
], IngressResolver);
exports.IngressResolver = IngressResolver;
//# sourceMappingURL=ingress.resolver.js.map