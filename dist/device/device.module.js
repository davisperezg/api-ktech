"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceModule = void 0;
const common_1 = require("@nestjs/common");
const device_resolver_1 = require("./resolvers/device.resolver");
const device_schema_1 = require("./schemas/device.schema");
const device_service_1 = require("./services/device.service");
const mongoose_1 = require("@nestjs/mongoose");
let DeviceModule = class DeviceModule {
};
DeviceModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Device', schema: device_schema_1.DeviceSchema }]),
        ],
        providers: [device_resolver_1.DeviceResolver, device_service_1.DeviceService],
    })
], DeviceModule);
exports.DeviceModule = DeviceModule;
//# sourceMappingURL=device.module.js.map