"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SExtModule = void 0;
const common_1 = require("@nestjs/common");
const sext_controller_1 = require("./controllers/sext.controller");
const sext_service_1 = require("./services/sext.service");
let SExtModule = class SExtModule {
};
SExtModule = __decorate([
    common_1.Module({
        providers: [sext_service_1.SExtService],
        controllers: [sext_controller_1.SextController],
    })
], SExtModule);
exports.SExtModule = SExtModule;
//# sourceMappingURL=sext.module.js.map