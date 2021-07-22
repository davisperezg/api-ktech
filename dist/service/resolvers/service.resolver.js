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
exports.ServiceResolver = void 0;
const service_service_1 = require("../services/service.service");
const graphql_1 = require("@nestjs/graphql");
const service_type_1 = require("../dto/querys/service.type");
const create_service_input_1 = require("../dto/inputs/create-service.input");
const update_service_input_1 = require("../dto/inputs/update-service.input");
let ServiceResolver = class ServiceResolver {
    constructor(serviceService) {
        this.serviceService = serviceService;
    }
    registerService(serviceInput) {
        return this.serviceService.createService(serviceInput);
    }
    updateService(serviceInput) {
        return this.serviceService.updateService(serviceInput);
    }
    getServices() {
        return this.serviceService.findAllServices();
    }
};
__decorate([
    graphql_1.Mutation(() => service_type_1.ServiceType),
    __param(0, graphql_1.Args({ name: 'serviceInput', type: () => create_service_input_1.CreateServiceInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_input_1.CreateServiceInput]),
    __metadata("design:returntype", void 0)
], ServiceResolver.prototype, "registerService", null);
__decorate([
    graphql_1.Mutation(() => service_type_1.ServiceType),
    __param(0, graphql_1.Args({ name: 'serviceInput', type: () => update_service_input_1.UpdateServiceInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_service_input_1.UpdateServiceInput]),
    __metadata("design:returntype", void 0)
], ServiceResolver.prototype, "updateService", null);
__decorate([
    graphql_1.Query(() => [service_type_1.ServiceType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServiceResolver.prototype, "getServices", null);
ServiceResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [service_service_1.ServiceService])
], ServiceResolver);
exports.ServiceResolver = ServiceResolver;
//# sourceMappingURL=service.resolver.js.map