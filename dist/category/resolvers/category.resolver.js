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
exports.CategoryResolver = void 0;
const category_type_1 = require("../dto/querys/category.type");
const category_service_1 = require("../services/category.service");
const graphql_1 = require("@nestjs/graphql");
const create_category_input_1 = require("../dto/inputs/create-category.input");
const update_category_input_1 = require("../dto/inputs/update-category.input");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../../lib/guards/gql-auth.guard");
let CategoryResolver = class CategoryResolver {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    registerCategory(categoryInput) {
        return this.categoryService.createCategory(categoryInput);
    }
    updateCategory(categoryInput) {
        return this.categoryService.updateCategory(categoryInput);
    }
    getCategorys() {
        return this.categoryService.findAllCategory();
    }
};
__decorate([
    graphql_1.Mutation(() => category_type_1.CategoryType),
    __param(0, graphql_1.Args({ name: 'categoryInput', type: () => create_category_input_1.CreateCategoryInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_input_1.CreateCategoryInput]),
    __metadata("design:returntype", void 0)
], CategoryResolver.prototype, "registerCategory", null);
__decorate([
    graphql_1.Mutation(() => category_type_1.CategoryType),
    __param(0, graphql_1.Args({ name: 'categoryInput', type: () => update_category_input_1.UpdateCategoryInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_category_input_1.UpdateCategoryInput]),
    __metadata("design:returntype", void 0)
], CategoryResolver.prototype, "updateCategory", null);
__decorate([
    graphql_1.Query(() => [category_type_1.CategoryType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "getCategorys", null);
CategoryResolver = __decorate([
    graphql_1.Resolver(),
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryResolver);
exports.CategoryResolver = CategoryResolver;
//# sourceMappingURL=category.resolver.js.map