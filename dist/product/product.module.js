"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const brand_schema_1 = require("../brand/schemas/brand.schema");
const category_schema_1 = require("../category/schemas/category.schema");
const model_schema_1 = require("../model/schemas/model.schema");
const product_resolver_1 = require("./resolvers/product.resolver");
const product_schema_1 = require("./schemas/product.schema");
const product_service_1 = require("./services/product.service");
const mongoose_1 = require("@nestjs/mongoose");
const category_service_1 = require("../category/services/category.service");
const brand_service_1 = require("../brand/services/brand.service");
const model_service_1 = require("../model/services/model.service");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Product', schema: product_schema_1.ProductSchema },
                { name: 'Category', schema: category_schema_1.CategorySchema },
                { name: 'Brand', schema: brand_schema_1.BrandSchema },
                { name: 'Model', schema: model_schema_1.ModelSchema },
            ]),
        ],
        providers: [
            product_resolver_1.ProductResolver,
            product_service_1.ProductService,
            category_service_1.CategoryService,
            brand_service_1.BrandService,
            model_service_1.ModelService,
        ],
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map