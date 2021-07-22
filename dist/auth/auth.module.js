"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const menu_service_1 = require("./../menu/services/menu.service");
const menu_schema_1 = require("./../menu/schemas/menu.schema");
const common_1 = require("@nestjs/common");
const auth_resolver_1 = require("./resolvers/auth.resolver");
const user_schema_1 = require("../user/schemas/user.schema");
const auth_service_1 = require("./services/auth.service");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./constants");
const jwt_strategies_1 = require("../lib/strategies/jwt.strategies");
const gql_auth_guard_1 = require("../lib/guards/gql-auth.guard");
const mongoose_1 = require("@nestjs/mongoose");
const user_service_1 = require("../user/services/user.service");
const role_service_1 = require("../role/services/role.service");
const role_schema_1 = require("../role/schemas/role.schema");
const module_schema_1 = require("../modules/schemas/module.schema");
const module_service_1 = require("../modules/services/module.service");
const access_schema_1 = require("../access/schemas/access.schema");
const access_service_1 = require("../access/services/access.service");
const roles_guard_1 = require("../lib/guards/roles.guard");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '5m' },
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: 'Role', schema: role_schema_1.RoleSchema },
                { name: 'Module', schema: module_schema_1.ModuleSchema },
                { name: 'Access', schema: access_schema_1.AccessSchema },
                { name: 'Menu', schema: menu_schema_1.MenuSchema },
            ]),
        ],
        providers: [
            auth_resolver_1.AuthResolver,
            auth_service_1.AuthService,
            jwt_strategies_1.JwtStrategy,
            gql_auth_guard_1.GqlAuthGuard,
            user_service_1.UserService,
            role_service_1.RoleService,
            module_service_1.ModuleService,
            access_service_1.AccessService,
            menu_service_1.MenuService,
            roles_guard_1.RolesGuard,
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map