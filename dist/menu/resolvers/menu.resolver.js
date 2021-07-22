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
exports.MenuResolver = void 0;
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../../lib/guards/gql-auth.guard");
const menu_service_1 = require("./../services/menu.service");
const menu_type_1 = require("./../dto/querys/menu.type");
const graphql_1 = require("@nestjs/graphql");
const create_menu_input_1 = require("./../dto/inputs/create-menu.input");
const update_menu_input_1 = require("../dto/inputs/update-menu.input");
const roles_guard_1 = require("../../lib/guards/roles.guard");
const roles_decorators_1 = require("../../lib/decorators/roles.decorators");
let MenuResolver = class MenuResolver {
    constructor(menuService) {
        this.menuService = menuService;
    }
    registerMenu(menuInput) {
        return this.menuService.createMenu(menuInput);
    }
    updateMenu(menuInput) {
        return this.menuService.updateMenu(menuInput);
    }
    getMenus() {
        return this.menuService.findAllMenu();
    }
};
__decorate([
    graphql_1.Mutation(() => menu_type_1.MenuType),
    roles_decorators_1.hasRoles('SuperAdmin'),
    __param(0, graphql_1.Args({ name: 'menuInput', type: () => create_menu_input_1.CreateMenuInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_menu_input_1.CreateMenuInput]),
    __metadata("design:returntype", void 0)
], MenuResolver.prototype, "registerMenu", null);
__decorate([
    graphql_1.Mutation(() => menu_type_1.MenuType),
    roles_decorators_1.hasRoles('SuperAdmin'),
    __param(0, graphql_1.Args({ name: 'menuInput', type: () => update_menu_input_1.UpdateMenuInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_menu_input_1.UpdateMenuInput]),
    __metadata("design:returntype", void 0)
], MenuResolver.prototype, "updateMenu", null);
__decorate([
    graphql_1.Query(() => [menu_type_1.MenuType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuResolver.prototype, "getMenus", null);
MenuResolver = __decorate([
    graphql_1.Resolver(),
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [menu_service_1.MenuService])
], MenuResolver);
exports.MenuResolver = MenuResolver;
//# sourceMappingURL=menu.resolver.js.map