"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EgressModule = void 0;
const category_schema_1 = require("./../category/schemas/category.schema");
const common_1 = require("@nestjs/common");
const egress_resolver_1 = require("./resolvers/egress.resolver");
const egress_schema_1 = require("./schemas/egress.schema");
const egress_service_1 = require("./services/egress.service");
const mongoose_1 = require("@nestjs/mongoose");
const category_service_1 = require("../category/services/category.service");
const user_schema_1 = require("../user/schemas/user.schema");
const user_service_1 = require("../user/services/user.service");
const role_schema_1 = require("../role/schemas/role.schema");
const role_service_1 = require("../role/services/role.service");
const module_service_1 = require("../modules/services/module.service");
const module_schema_1 = require("../modules/schemas/module.schema");
const access_schema_1 = require("../access/schemas/access.schema");
const menu_schema_1 = require("../menu/schemas/menu.schema");
const access_service_1 = require("../access/services/access.service");
const menu_service_1 = require("../menu/services/menu.service");
let EgressModule = class EgressModule {
};
EgressModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Egress', schema: egress_schema_1.EgressSchema },
                { name: 'Category', schema: category_schema_1.CategorySchema },
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: 'Role', schema: role_schema_1.RoleSchema },
                { name: 'Module', schema: module_schema_1.ModuleSchema },
                { name: 'Access', schema: access_schema_1.AccessSchema },
                { name: 'Menu', schema: menu_schema_1.MenuSchema },
            ]),
        ],
        providers: [
            egress_resolver_1.EgressResolver,
            egress_service_1.EgressService,
            category_service_1.CategoryService,
            user_service_1.UserService,
            role_service_1.RoleService,
            module_service_1.ModuleService,
            access_service_1.AccessService,
            menu_service_1.MenuService,
        ],
    })
], EgressModule);
exports.EgressModule = EgressModule;
//# sourceMappingURL=egress.module.js.map