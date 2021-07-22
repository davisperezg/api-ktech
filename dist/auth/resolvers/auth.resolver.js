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
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const auth_change_password_input_1 = require("../dto/inputs/auth-change-password.input");
const auth_refresh_token_input_1 = require("../dto/inputs/auth-refresh-token.input");
const auth_input_1 = require("../dto/inputs/auth.input");
const user_refresh_token_type_1 = require("../dto/querys/user-refresh-token.type");
const user_token_type_1 = require("../dto/querys/user-token.type");
const auth_service_1 = require("../services/auth.service");
const gql_auth_guard_1 = require("../../lib/guards/gql-auth.guard");
const roles_decorators_1 = require("../../lib/decorators/roles.decorators");
const roles_guard_1 = require("../../lib/guards/roles.guard");
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    login(authInput) {
        return this.authService.signIn(authInput);
    }
    refreshToken(authInput) {
        return this.authService.getTokenWithRefresh(authInput);
    }
    changePasswordToUser(authInput) {
        return this.authService.changePasswordToUser(authInput);
    }
    changePasswordToAdmin(authInput) {
        return this.authService.changePasswordToAdmin(authInput);
    }
};
__decorate([
    graphql_1.Mutation(() => user_token_type_1.UserTokenType),
    __param(0, graphql_1.Args({ name: 'authInput', type: () => auth_input_1.AuthInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_input_1.AuthInput]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "login", null);
__decorate([
    graphql_1.Mutation(() => user_refresh_token_type_1.UserRefreshTokenType),
    __param(0, graphql_1.Args({ name: 'authInput', type: () => auth_refresh_token_input_1.AuthRefreshTokenInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_refresh_token_input_1.AuthRefreshTokenInput]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "refreshToken", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    __param(0, graphql_1.Args({ name: 'authInput', type: () => auth_change_password_input_1.AuthChangePasswordInputToUser })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_change_password_input_1.AuthChangePasswordInputToUser]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "changePasswordToUser", null);
__decorate([
    roles_decorators_1.hasRoles('SuperAdmin'),
    graphql_1.Mutation(() => Boolean),
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    __param(0, graphql_1.Args({ name: 'authInput', type: () => auth_change_password_input_1.AuthChangePasswordInputToAdmin })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_change_password_input_1.AuthChangePasswordInputToAdmin]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "changePasswordToAdmin", null);
AuthResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map