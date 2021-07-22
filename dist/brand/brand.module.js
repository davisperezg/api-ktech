"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandModule = void 0;
const common_1 = require("@nestjs/common");
const brand_resolver_1 = require("./resolvers/brand.resolver");
const brand_service_1 = require("./services/brand.service");
const mongoose_1 = require("@nestjs/mongoose");
const brand_schema_1 = require("./schemas/brand.schema");
const category_service_1 = require("../category/services/category.service");
const category_schema_1 = require("../category/schemas/category.schema");
let BrandModule = class BrandModule {
};
BrandModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Brand', schema: brand_schema_1.BrandSchema },
                { name: 'Category', schema: category_schema_1.CategorySchema },
            ]),
        ],
        providers: [brand_resolver_1.BrandResolver, brand_service_1.BrandService, category_service_1.CategoryService],
    })
], BrandModule);
exports.BrandModule = BrandModule;
//# sourceMappingURL=brand.module.js.map