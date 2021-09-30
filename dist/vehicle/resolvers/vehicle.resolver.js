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
exports.VehicleResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_vehicle_input_1 = require("../dto/inputs/create-vehicle.input");
const update_vehicle_input_1 = require("../dto/inputs/update-vehicle.input");
const vehicle_type_1 = require("../dto/querys/vehicle.type");
const vehicle_service_1 = require("../services/vehicle.service");
const gql_auth_guard_1 = require("../../lib/guards/gql-auth.guard");
const common_1 = require("@nestjs/common");
const user_schema_1 = require("../../user/schemas/user.schema");
const ctx_user_decorators_1 = require("../../lib/decorators/ctx-user.decorators");
let VehicleResolver = class VehicleResolver {
    constructor(vehicleService) {
        this.vehicleService = vehicleService;
    }
    registerVehicle(vehicleInput, user) {
        return this.vehicleService.createVehicle(vehicleInput, user.id);
    }
    updateVehicle(vehicleInput, user) {
        return this.vehicleService.updateVehicle(vehicleInput, user.id);
    }
    deleteVehicle(id) {
        return this.vehicleService.deleteVehicleById(id);
    }
    getVehicles() {
        return this.vehicleService.findAllVehicle();
    }
    getVehiculosInstaladosXrango(desde, hasta) {
        return this.vehicleService.buscarXrangoFechaInstalaciones(desde, hasta);
    }
    getVehiculosVencidosXFecha(desde, hasta) {
        return this.vehicleService.buscarVencidosXrangoFechas(desde, hasta);
    }
};
__decorate([
    graphql_1.Mutation(() => vehicle_type_1.VehicleType),
    __param(0, graphql_1.Args({ name: 'vehicleInput', type: () => create_vehicle_input_1.CreateVehicleInput })),
    __param(1, ctx_user_decorators_1.CtxUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vehicle_input_1.CreateVehicleInput, Object]),
    __metadata("design:returntype", void 0)
], VehicleResolver.prototype, "registerVehicle", null);
__decorate([
    graphql_1.Mutation(() => vehicle_type_1.VehicleType),
    __param(0, graphql_1.Args({ name: 'vehicleInput', type: () => update_vehicle_input_1.UpdateVehicleInput })),
    __param(1, ctx_user_decorators_1.CtxUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_vehicle_input_1.UpdateVehicleInput, Object]),
    __metadata("design:returntype", void 0)
], VehicleResolver.prototype, "updateVehicle", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VehicleResolver.prototype, "deleteVehicle", null);
__decorate([
    graphql_1.Query(() => [vehicle_type_1.VehicleType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VehicleResolver.prototype, "getVehicles", null);
__decorate([
    graphql_1.Query(() => [vehicle_type_1.VehicleType]),
    __param(0, graphql_1.Args('desde')), __param(1, graphql_1.Args('hasta')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date, Date]),
    __metadata("design:returntype", void 0)
], VehicleResolver.prototype, "getVehiculosInstaladosXrango", null);
__decorate([
    graphql_1.Query(() => [vehicle_type_1.VehicleType]),
    __param(0, graphql_1.Args('desde')), __param(1, graphql_1.Args('hasta')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date, Date]),
    __metadata("design:returntype", void 0)
], VehicleResolver.prototype, "getVehiculosVencidosXFecha", null);
VehicleResolver = __decorate([
    graphql_1.Resolver(),
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [vehicle_service_1.VehicleService])
], VehicleResolver);
exports.VehicleResolver = VehicleResolver;
//# sourceMappingURL=vehicle.resolver.js.map