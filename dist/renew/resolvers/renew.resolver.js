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
exports.RenewResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const renew_service_1 = require("../services/renew.service");
const ctx_user_decorators_1 = require("../../lib/decorators/ctx-user.decorators");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../../lib/guards/gql-auth.guard");
const renew_type_1 = require("../dto/querys/renew.type");
const create_renew_input_1 = require("../dto/inputs/create-renew.input");
const user_schema_1 = require("../../user/schemas/user.schema");
let RenewResolver = class RenewResolver {
    constructor(renewService) {
        this.renewService = renewService;
    }
    registerRenew(renewInput, user) {
        return this.renewService.createRenew(renewInput, user.id);
    }
    getRenews() {
        return this.renewService.findAllRenews();
    }
};
__decorate([
    graphql_1.Mutation(() => renew_type_1.RenewType),
    __param(0, graphql_1.Args({ name: 'renewInput', type: () => create_renew_input_1.CreateRenewInput })),
    __param(1, ctx_user_decorators_1.CtxUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_renew_input_1.CreateRenewInput, Object]),
    __metadata("design:returntype", void 0)
], RenewResolver.prototype, "registerRenew", null);
__decorate([
    graphql_1.Query(() => [renew_type_1.RenewType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RenewResolver.prototype, "getRenews", null);
RenewResolver = __decorate([
    graphql_1.Resolver(),
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [renew_service_1.RenewService])
], RenewResolver);
exports.RenewResolver = RenewResolver;
//# sourceMappingURL=renew.resolver.js.map