"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngressModule = void 0;
const common_1 = require("@nestjs/common");
const ingress_resolver_1 = require("./resolvers/ingress.resolver");
const ingress_service_1 = require("./services/ingress.service");
const mongoose_1 = require("@nestjs/mongoose");
const ingress_schema_1 = require("./schemas/ingress.schema");
const category_schema_1 = require("../category/schemas/category.schema");
const category_service_1 = require("../category/services/category.service");
let IngressModule = class IngressModule {
};
IngressModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Ingress', schema: ingress_schema_1.IngressSchema },
                { name: 'Category', schema: category_schema_1.CategorySchema },
            ]),
        ],
        providers: [ingress_resolver_1.IngressResolver, ingress_service_1.IngressService, category_service_1.CategoryService],
    })
], IngressModule);
exports.IngressModule = IngressModule;
//# sourceMappingURL=ingress.module.js.map