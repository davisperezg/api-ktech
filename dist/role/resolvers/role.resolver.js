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
exports.RoleResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const ctx_user_decorators_1 = require("../../lib/decorators/ctx-user.decorators");
const roles_decorators_1 = require("../../lib/decorators/roles.decorators");
const gql_auth_guard_1 = require("../../lib/guards/gql-auth.guard");
const roles_guard_1 = require("../../lib/guards/roles.guard");
const role_update_input_1 = require("../dto/inputs/role-update.input");
const role_input_1 = require("../dto/inputs/role.input");
const role_type_1 = require("../dto/querys/role.type");
const role_service_1 = require("../services/role.service");
let RoleResolver = class RoleResolver {
    constructor(roleService) {
        this.roleService = roleService;
    }
    registerRole(roleInput, user) {
        return this.roleService.createRole(roleInput, user);
    }
    updateRole(roleInput) {
        return this.roleService.updateRole(roleInput);
    }
    deleteRole(id) {
        return this.roleService.deleteRoleById(id);
    }
    getRoles() {
        return this.roleService.findAllRoles();
    }
    getRole(id) {
        return this.roleService.findOneRoleById(id);
    }
};
__decorate([
    graphql_1.Mutation(() => role_type_1.RoleType),
    __param(0, graphql_1.Args('roleInput')),
    __param(1, ctx_user_decorators_1.CtxUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_input_1.RoleInput, Object]),
    __metadata("design:returntype", void 0)
], RoleResolver.prototype, "registerRole", null);
__decorate([
    graphql_1.Mutation(() => role_type_1.RoleType),
    __param(0, graphql_1.Args({ name: 'roleInput', type: () => role_update_input_1.RoleUpdateInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_update_input_1.RoleUpdateInput]),
    __metadata("design:returntype", void 0)
], RoleResolver.prototype, "updateRole", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    roles_decorators_1.hasRoles('SuperAdmin'),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoleResolver.prototype, "deleteRole", null);
__decorate([
    graphql_1.Query(() => [role_type_1.RoleType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoleResolver.prototype, "getRoles", null);
__decorate([
    graphql_1.Query(() => role_type_1.RoleType),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoleResolver.prototype, "getRole", null);
RoleResolver = __decorate([
    graphql_1.Resolver(),
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleResolver);
exports.RoleResolver = RoleResolver;
//# sourceMappingURL=role.resolver.js.map