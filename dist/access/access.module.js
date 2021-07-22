"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessModule = void 0;
const access_schema_1 = require("./schemas/access.schema");
const common_1 = require("@nestjs/common");
const access_resolver_1 = require("./resolvers/access.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const access_service_1 = require("./services/access.service");
let AccessModule = class AccessModule {
};
AccessModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Access', schema: access_schema_1.AccessSchema }]),
        ],
        providers: [access_resolver_1.AccessResolver, access_service_1.AccessService],
    })
], AccessModule);
exports.AccessModule = AccessModule;
//# sourceMappingURL=access.module.js.map