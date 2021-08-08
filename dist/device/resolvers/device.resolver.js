"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceResolver = void 0;
const device_service_1 = require("../services/device.service");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../../lib/guards/gql-auth.guard");
const device_type_1 = require("../dto/querys/device.type");
const create_device_input_1 = require("../dto/inputs/create-device.input");
const update_device_input_1 = require("../dto/inputs/update-device.input");
let DeviceResolver = class DeviceResolver {
    constructor(deviceService) {
        this.deviceService = deviceService;
    }
    registerDevice(deviceInput) {
        return this.deviceService.createDevice(deviceInput);
    }
    updateDevice(deviceInput) {
        return this.deviceService.updateDevice(deviceInput);
    }
    deleteDevice(id) {
        return this.deviceService.deleteDevice(id);
    }
    getDevices() {
        return this.deviceService.findAllDevice();
    }
};
__decorate([
    graphql_1.Mutation(() => device_type_1.DeviceType),
    __param(0, graphql_1.Args({ name: 'deviceInput', type: () => create_device_input_1.CreateDeviceInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_device_input_1.CreateDeviceInput]),
    __metadata("design:returntype", void 0)
], DeviceResolver.prototype, "registerDevice", null);
__decorate([
    graphql_1.Mutation(() => device_type_1.DeviceType),
    __param(0, graphql_1.Args({ name: 'deviceInput', type: () => update_device_input_1.UpdateDeviceInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_device_input_1.UpdateDeviceInput]),
    __metadata("design:returntype", void 0)
], DeviceResolver.prototype, "updateDevice", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DeviceResolver.prototype, "deleteDevice", null);
__decorate([
    graphql_1.Query(() => [device_type_1.DeviceType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeviceResolver.prototype, "getDevices", null);
DeviceResolver = __decorate([
    graphql_1.Resolver(),
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [device_service_1.DeviceService])
], DeviceResolver);
exports.DeviceResolver = DeviceResolver;
//# sourceMappingURL=device.resolver.js.map