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
exports.ModelResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_model_input_1 = require("../dto/inputs/create-model.input");
const model_service_1 = require("../services/model.service");
const update_model_input_1 = require("../dto/inputs/update-model.input");
const model_type_1 = require("../dto/querys/model.type");
let ModelResolver = class ModelResolver {
    constructor(modelService) {
        this.modelService = modelService;
    }
    registerModel(modelInput) {
        return this.modelService.createModel(modelInput);
    }
    updateModel(modelInput) {
        return this.modelService.updateModel(modelInput);
    }
    getModels() {
        return this.modelService.findAllModels();
    }
    getModelsByBrand(brand) {
        return this.modelService.findModelsByBrand(brand);
    }
};
__decorate([
    graphql_1.Mutation(() => model_type_1.ModelType),
    __param(0, graphql_1.Args({ name: 'modelInput', type: () => create_model_input_1.CreateModelInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_model_input_1.CreateModelInput]),
    __metadata("design:returntype", void 0)
], ModelResolver.prototype, "registerModel", null);
__decorate([
    graphql_1.Mutation(() => model_type_1.ModelType),
    __param(0, graphql_1.Args({ name: 'modelInput', type: () => update_model_input_1.UpdateModelInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_model_input_1.UpdateModelInput]),
    __metadata("design:returntype", void 0)
], ModelResolver.prototype, "updateModel", null);
__decorate([
    graphql_1.Query(() => [model_type_1.ModelType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ModelResolver.prototype, "getModels", null);
__decorate([
    graphql_1.Query(() => [model_type_1.ModelType]),
    __param(0, graphql_1.Args('brand')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ModelResolver.prototype, "getModelsByBrand", null);
ModelResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [model_service_1.ModelService])
], ModelResolver);
exports.ModelResolver = ModelResolver;
//# sourceMappingURL=model.resolver.js.map