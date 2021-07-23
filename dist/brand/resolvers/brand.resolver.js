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
exports.BrandResolver = void 0;
const update_brand_input_1 = require("./../dto/inputs/update-brand.input");
const create_brand_input_1 = require("./../dto/inputs/create-brand.input");
const brand_type_1 = require("../dto/querys/brand.type");
const brand_service_1 = require("../services/brand.service");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../../lib/guards/gql-auth.guard");
let BrandResolver = class BrandResolver {
    constructor(brandService) {
        this.brandService = brandService;
    }
    registerBrand(brandInput) {
        return this.brandService.createBrand(brandInput);
    }
    updateBrand(brandInput) {
        return this.brandService.updateBrand(brandInput);
    }
    getBrands() {
        return this.brandService.findAllBrands();
    }
    getBrandsByCategory(category) {
        return this.brandService.findBrandsByCategory(category);
    }
};
__decorate([
    graphql_1.Mutation(() => brand_type_1.BrandType),
    __param(0, graphql_1.Args({ name: 'brandInput', type: () => create_brand_input_1.CreateBrandInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_brand_input_1.CreateBrandInput]),
    __metadata("design:returntype", void 0)
], BrandResolver.prototype, "registerBrand", null);
__decorate([
    graphql_1.Mutation(() => brand_type_1.BrandType),
    __param(0, graphql_1.Args({ name: 'brandInput', type: () => update_brand_input_1.UpdateBrandInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_brand_input_1.UpdateBrandInput]),
    __metadata("design:returntype", void 0)
], BrandResolver.prototype, "updateBrand", null);
__decorate([
    graphql_1.Query(() => [brand_type_1.BrandType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BrandResolver.prototype, "getBrands", null);
__decorate([
    graphql_1.Query(() => [brand_type_1.BrandType]),
    __param(0, graphql_1.Args('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BrandResolver.prototype, "getBrandsByCategory", null);
BrandResolver = __decorate([
    graphql_1.Resolver(),
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [brand_service_1.BrandService])
], BrandResolver);
exports.BrandResolver = BrandResolver;
//# sourceMappingURL=brand.resolver.js.map