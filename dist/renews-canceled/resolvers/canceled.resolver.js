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
exports.CanceledResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../../lib/guards/gql-auth.guard");
const update_canceled_input_1 = require("../dto/inputs/update-canceled.input");
const create_canceled_input_1 = require("../dto/inputs/create-canceled.input");
const canceled_types_1 = require("../dto/querys/canceled-types");
const canceled_service_1 = require("../services/canceled.service");
let CanceledResolver = class CanceledResolver {
    constructor(canceledService) {
        this.canceledService = canceledService;
    }
    registerCanceled(canceledInput) {
        return this.canceledService.createCanceled(canceledInput);
    }
    updateCanceled(canceledInput) {
        return this.canceledService.updateCanceled(canceledInput);
    }
    getCanceled(id) {
        return this.canceledService.findOneCanceledById(id);
    }
};
__decorate([
    graphql_1.Mutation(() => canceled_types_1.CanceledType),
    __param(0, graphql_1.Args({ name: 'canceledInput', type: () => create_canceled_input_1.CreateCanceledInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_canceled_input_1.CreateCanceledInput]),
    __metadata("design:returntype", void 0)
], CanceledResolver.prototype, "registerCanceled", null);
__decorate([
    graphql_1.Mutation(() => canceled_types_1.CanceledType),
    __param(0, graphql_1.Args({ name: 'canceledInput', type: () => update_canceled_input_1.UpdateCanceledInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_canceled_input_1.UpdateCanceledInput]),
    __metadata("design:returntype", void 0)
], CanceledResolver.prototype, "updateCanceled", null);
__decorate([
    graphql_1.Query(() => canceled_types_1.CanceledType),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CanceledResolver.prototype, "getCanceled", null);
CanceledResolver = __decorate([
    graphql_1.Resolver(),
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [canceled_service_1.CanceledService])
], CanceledResolver);
exports.CanceledResolver = CanceledResolver;
//# sourceMappingURL=canceled.resolver.js.map