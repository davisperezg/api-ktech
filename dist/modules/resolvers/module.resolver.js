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
exports.ModuleResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const create_module_input_1 = require("../dto/inputs/create-module.input");
const update_module_input_1 = require("../dto/inputs/update-module.input");
const module_type_1 = require("../dto/querys/module.type");
const module_service_1 = require("../services/module.service");
const gql_auth_guard_1 = require("../../lib/guards/gql-auth.guard");
const roles_guard_1 = require("../../lib/guards/roles.guard");
const roles_decorators_1 = require("../../lib/decorators/roles.decorators");
const ctx_user_decorators_1 = require("../../lib/decorators/ctx-user.decorators");
const user_schema_1 = require("../../user/schemas/user.schema");
let ModuleResolver = class ModuleResolver {
    constructor(moduleService) {
        this.moduleService = moduleService;
    }
    registerModule(moduleInput) {
        return this.moduleService.createModule(moduleInput);
    }
    updateModule(moduleInput) {
        return this.moduleService.updateModule(moduleInput);
    }
    deleteModule(id) {
        return this.moduleService.deleteModule(id);
    }
    getModules() {
        return this.moduleService.findAllModules();
    }
    getModule(id) {
        return this.moduleService.findOneModuleById(id);
    }
};
__decorate([
    graphql_1.Mutation(() => module_type_1.ModuleType),
    roles_decorators_1.hasRoles('SuperAdmin'),
    __param(0, graphql_1.Args({ name: 'moduleInput', type: () => create_module_input_1.CreateModuleInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_module_input_1.CreateModuleInput]),
    __metadata("design:returntype", void 0)
], ModuleResolver.prototype, "registerModule", null);
__decorate([
    graphql_1.Mutation(() => module_type_1.ModuleType),
    roles_decorators_1.hasRoles('SuperAdmin'),
    __param(0, graphql_1.Args({ name: 'moduleInput', type: () => update_module_input_1.UpdateModuleInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_module_input_1.UpdateModuleInput]),
    __metadata("design:returntype", void 0)
], ModuleResolver.prototype, "updateModule", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    roles_decorators_1.hasRoles('SuperAdmin'),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModuleResolver.prototype, "deleteModule", null);
__decorate([
    graphql_1.Query(() => [module_type_1.ModuleType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ModuleResolver.prototype, "getModules", null);
__decorate([
    graphql_1.Query(() => module_type_1.ModuleType),
    roles_decorators_1.hasRoles('SuperAdmin'),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModuleResolver.prototype, "getModule", null);
ModuleResolver = __decorate([
    graphql_1.Resolver(),
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [module_service_1.ModuleService])
], ModuleResolver);
exports.ModuleResolver = ModuleResolver;
//# sourceMappingURL=module.resolver.js.map