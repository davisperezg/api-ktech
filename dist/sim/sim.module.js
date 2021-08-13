"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimModule = void 0;
const common_1 = require("@nestjs/common");
const sim_resolver_1 = require("./resolvers/sim.resolver");
const sim_service_1 = require("./services/sim.service");
let SimModule = class SimModule {
};
SimModule = __decorate([
    common_1.Module({
        providers: [sim_resolver_1.SimResolver, sim_service_1.SimService]
    })
], SimModule);
exports.SimModule = SimModule;
//# sourceMappingURL=sim.module.js.map