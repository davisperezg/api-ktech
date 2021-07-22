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
exports.AccessResolver = void 0;
const access_type_1 = require("./../dto/querys/access.type");
const graphql_1 = require("@nestjs/graphql");
const access_service_1 = require("../services/access.service");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../../lib/guards/gql-auth.guard");
const roles_guard_1 = require("../../lib/guards/roles.guard");
let AccessResolver = class AccessResolver {
    constructor(accessService) {
        this.accessService = accessService;
    }
    getAccess() {
        return this.accessService.findAllAccess();
    }
};
__decorate([
    graphql_1.Query(() => [access_type_1.AccessType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccessResolver.prototype, "getAccess", null);
AccessResolver = __decorate([
    graphql_1.Resolver(),
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [access_service_1.AccessService])
], AccessResolver);
exports.AccessResolver = AccessResolver;
//# sourceMappingURL=access.resolver.js.map