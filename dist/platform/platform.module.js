"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformModule = void 0;
const common_1 = require("@nestjs/common");
const platform_resolver_1 = require("./resolvers/platform.resolver");
const platform_service_1 = require("./services/platform.service");
let PlatformModule = class PlatformModule {
};
PlatformModule = __decorate([
    common_1.Module({
        providers: [platform_resolver_1.PlatformResolver, platform_service_1.PlatformService]
    })
], PlatformModule);
exports.PlatformModule = PlatformModule;
//# sourceMappingURL=platform.module.js.map