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
exports.UserResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const roles_decorators_1 = require("../../lib/decorators/roles.decorators");
const roles_guard_1 = require("../../lib/guards/roles.guard");
const ctx_user_decorators_1 = require("../../lib/decorators/ctx-user.decorators");
const gql_auth_guard_1 = require("../../lib/guards/gql-auth.guard");
const user_update_input_1 = require("../dto/inputs/user-update.input");
const user_input_1 = require("../dto/inputs/user.input");
const user_type_1 = require("../dto/querys/user.type");
const user_service_1 = require("../services/user.service");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    registerUser(userInput, user) {
        return this.userService.createUser(userInput, user);
    }
    updateUser(userInput, user) {
        return this.userService.updateUser(userInput, user);
    }
    deleteUser(id) {
        return this.userService.deleteUserById(id);
    }
    getUsers() {
        return this.userService.findAllUsers();
    }
    getUser(id) {
        return this.userService.findOneUserById(id);
    }
    me(user) {
        return this.userService.findOneUserById(user.id);
    }
    desactivateUser(id) {
        return this.userService.desactivateUser(id);
    }
    activateUser(id) {
        return this.userService.activarUser(id);
    }
};
__decorate([
    graphql_1.Mutation(() => user_type_1.UserType),
    __param(0, graphql_1.Args('userInput')),
    __param(1, ctx_user_decorators_1.CtxUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.UserInput, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "registerUser", null);
__decorate([
    graphql_1.Mutation(() => user_type_1.UserType),
    __param(0, graphql_1.Args({ name: 'userInput', type: () => user_update_input_1.UserUpdateInput })),
    __param(1, ctx_user_decorators_1.CtxUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_update_input_1.UserUpdateInput, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "updateUser", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    graphql_1.Query(() => [user_type_1.UserType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsers", null);
__decorate([
    graphql_1.Query(() => user_type_1.UserType),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUser", null);
__decorate([
    graphql_1.Query(() => user_type_1.UserType),
    __param(0, ctx_user_decorators_1.CtxUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    graphql_1.Mutation(() => user_type_1.UserType),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "desactivateUser", null);
__decorate([
    graphql_1.Mutation(() => user_type_1.UserType),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "activateUser", null);
UserResolver = __decorate([
    graphql_1.Resolver(),
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map