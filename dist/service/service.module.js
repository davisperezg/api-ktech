"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModule = void 0;
const common_1 = require("@nestjs/common");
const category_schema_1 = require("../category/schemas/category.schema");
const category_service_1 = require("../category/services/category.service");
const service_resolver_1 = require("./resolvers/service.resolver");
const service_schema_1 = require("./schemas/service.schema");
const service_service_1 = require("./services/service.service");
const mongoose_1 = require("@nestjs/mongoose");
let ServiceModule = class ServiceModule {
};
ServiceModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Service', schema: service_schema_1.ServiceSchema },
                { name: 'Category', schema: category_schema_1.CategorySchema },
            ]),
        ],
        providers: [service_resolver_1.ServiceResolver, service_service_1.ServiceService, category_service_1.CategoryService],
    })
], ServiceModule);
exports.ServiceModule = ServiceModule;
//# sourceMappingURL=service.module.js.map