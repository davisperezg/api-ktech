"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const menu_schema_1 = require("./../menu/schemas/menu.schema");
const menu_service_1 = require("./../menu/services/menu.service");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const role_schema_1 = require("../role/schemas/role.schema");
const role_service_1 = require("../role/services/role.service");
const user_schema_1 = require("./schemas/user.schema");
const user_resolver_1 = require("./resolvers/user.resolver");
const user_service_1 = require("./services/user.service");
const module_service_1 = require("../modules/services/module.service");
const module_schema_1 = require("../modules/schemas/module.schema");
const access_service_1 = require("../access/services/access.service");
const access_schema_1 = require("../access/schemas/access.schema");
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: 'Role', schema: role_schema_1.RoleSchema },
                { name: 'Module', schema: module_schema_1.ModuleSchema },
                { name: 'Access', schema: access_schema_1.AccessSchema },
                { name: 'Menu', schema: menu_schema_1.MenuSchema },
            ]),
        ],
        providers: [
            user_service_1.UserService,
            user_resolver_1.UserResolver,
            role_service_1.RoleService,
            module_service_1.ModuleService,
            access_service_1.AccessService,
            menu_service_1.MenuService,
        ],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map