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
exports.ModelService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const brand_schema_1 = require("../../brand/schemas/brand.schema");
const brand_service_1 = require("../../brand/services/brand.service");
const conts_1 = require("../../lib/conts");
let ModelService = class ModelService {
    constructor(modelModel, brandService) {
        this.modelModel = modelModel;
        this.brandService = brandService;
    }
    async onModuleInit() {
        try {
            await this.modelModel.updateMany({ status: null }, { status: 1 });
        }
        catch (e) {
            throw new Error(`Error en ModelService.onModuleInit ${e}`);
        }
    }
    async createModel(modelInput) {
        const { name, brand } = modelInput;
        await this.findOneModelByName(name, conts_1.EXIST);
        const findBrand = await this.brandService.findOneBrandByName(brand, conts_1.NOEXIST);
        const newModel = new this.modelModel(Object.assign(Object.assign({}, modelInput), { brand: findBrand._id, status: 1 }));
        let modelSaved;
        let foundModel;
        try {
            modelSaved = await newModel.save();
        }
        catch (e) {
            throw new Error(`Error en ModelService.createModel ${e}`);
        }
        try {
            foundModel = await modelSaved
                .populate([{ path: 'brand' }])
                .execPopulate();
        }
        catch (e) {
            throw new Error(`Error en ModelService.createModel.list ${e}`);
        }
        return foundModel;
    }
    async updateModel(modelInput) {
        const { id, brand } = modelInput;
        let findBrand;
        let updateModel;
        const findModelById = await this.findOneModelById(id);
        if (brand) {
            findBrand = await this.brandService.findOneBrandByName(brand, conts_1.NOEXIST);
        }
        else {
            findBrand = await this.brandService.findOneBrandByName(findModelById.brand.name, conts_1.NULL);
        }
        try {
            updateModel = await this.modelModel
                .findByIdAndUpdate(id, Object.assign(Object.assign({}, modelInput), { brand: findBrand._id }), { new: true })
                .populate([
                {
                    path: 'brand',
                },
            ]);
        }
        catch (e) {
            throw new Error(`Error en ModelService.updateModel ${e}`);
        }
        return updateModel;
    }
    async findAllModels() {
        let findModel;
        try {
            findModel = await this.modelModel.find({ status: 1 }).populate([
                {
                    path: 'brand',
                },
            ]);
        }
        catch (e) {
            throw new Error(`Error en ModelService.findAllModels ${e}`);
        }
        return findModel;
    }
    async findModelsByBrand(brand) {
        let models;
        try {
            models = await this.modelModel.find().populate({
                path: 'brand',
                match: {
                    name: brand,
                },
            });
            models = models.filter((model) => model.brand !== null);
        }
        catch (e) {
            throw new Error(`Error en ModelService.findModelsByBrand ${e}`);
        }
        return models;
    }
    async findOneModelById(id) {
        let model;
        try {
            model = await this.modelModel.findById(id).populate([
                {
                    path: 'brand',
                },
            ]);
        }
        catch (e) {
            throw new Error(`Error en ModelService.findOneModelById ${e}`);
        }
        if (!model)
            throw new common_1.NotFoundException(`El modelo no se encuentra o no existe`);
        return model;
    }
    async findOneModelByName(name, param) {
        let model;
        try {
            model = await this.modelModel.findOne({ name });
        }
        catch (e) {
            throw new common_1.BadRequestException({
                path: 'brand',
                message: [`La marca ${name} ya existe.`],
            });
        }
        switch (param) {
            case conts_1.EXIST:
                if (model)
                    throw new common_1.BadRequestException({
                        path: 'model',
                        message: [`El modelo ${name} ya existe.`],
                    });
                break;
            case conts_1.NOEXIST:
                if (!model)
                    throw new common_1.BadRequestException({
                        path: 'model',
                        message: [`El modelo no existe.`],
                    });
                break;
        }
        return model;
    }
};
ModelService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Model')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        brand_service_1.BrandService])
], ModelService);
exports.ModelService = ModelService;
//# sourceMappingURL=model.service.js.map