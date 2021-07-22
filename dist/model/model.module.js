"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelModule = void 0;
const common_1 = require("@nestjs/common");
const model_resolver_1 = require("./resolvers/model.resolver");
const model_service_1 = require("./services/model.service");
const mongoose_1 = require("@nestjs/mongoose");
const model_schema_1 = require("./schemas/model.schema");
const brand_schema_1 = require("../brand/schemas/brand.schema");
const brand_service_1 = require("../brand/services/brand.service");
const category_schema_1 = require("../category/schemas/category.schema");
const category_service_1 = require("../category/services/category.service");
let ModelModule = class ModelModule {
};
ModelModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Model', schema: model_schema_1.ModelSchema },
                { name: 'Brand', schema: brand_schema_1.BrandSchema },
                { name: 'Category', schema: category_schema_1.CategorySchema },
            ]),
        ],
        providers: [model_resolver_1.ModelResolver, model_service_1.ModelService, brand_service_1.BrandService, category_service_1.CategoryService],
    })
], ModelModule);
exports.ModelModule = ModelModule;
//# sourceMappingURL=model.module.js.map