"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuModule = void 0;
const menu_schema_1 = require("./schemas/menu.schema");
const common_1 = require("@nestjs/common");
const menu_service_1 = require("./services/menu.service");
const menu_resolver_1 = require("./resolvers/menu.resolver");
const mongoose_1 = require("@nestjs/mongoose");
let MenuModule = class MenuModule {
};
MenuModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Menu', schema: menu_schema_1.MenuSchema }])],
        providers: [menu_service_1.MenuService, menu_resolver_1.MenuResolver],
    })
], MenuModule);
exports.MenuModule = MenuModule;
//# sourceMappingURL=menu.module.js.map