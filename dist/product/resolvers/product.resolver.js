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
exports.ProductResolver = void 0;
const product_service_1 = require("../services/product.service");
const graphql_1 = require("@nestjs/graphql");
const product_type_1 = require("../dto/querys/product.type");
const create_product_input_1 = require("../dto/inputs/create-product.input");
const update_product_input_1 = require("../dto/inputs/update-product.input");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../../lib/guards/gql-auth.guard");
let ProductResolver = class ProductResolver {
    constructor(productService) {
        this.productService = productService;
    }
    registerProduct(productInput) {
        return this.productService.createProduct(productInput);
    }
    updateProduct(productInput) {
        return this.productService.updateProduct(productInput);
    }
    getProducts() {
        return this.productService.findAllProducts();
    }
};
__decorate([
    graphql_1.Mutation(() => product_type_1.ProductType),
    __param(0, graphql_1.Args({ name: 'productInput', type: () => create_product_input_1.CreateProductInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_input_1.CreateProductInput]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "registerProduct", null);
__decorate([
    graphql_1.Mutation(() => product_type_1.ProductType),
    __param(0, graphql_1.Args({ name: 'productInput', type: () => update_product_input_1.UpdateProductInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_product_input_1.UpdateProductInput]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "updateProduct", null);
__decorate([
    graphql_1.Query(() => [product_type_1.ProductType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getProducts", null);
ProductResolver = __decorate([
    graphql_1.Resolver(),
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductResolver);
exports.ProductResolver = ProductResolver;
//# sourceMappingURL=product.resolver.js.map