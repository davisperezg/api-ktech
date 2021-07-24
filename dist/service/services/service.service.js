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
exports.ServiceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_schema_1 = require("../../category/schemas/category.schema");
const category_service_1 = require("../../category/services/category.service");
const conts_1 = require("../../lib/conts");
let ServiceService = class ServiceService {
    constructor(serviceModel, categoryService) {
        this.serviceModel = serviceModel;
        this.categoryService = categoryService;
    }
    async createService(serviceInput) {
        const { name, category } = serviceInput;
        await this.findOneServiceByName(name, conts_1.EXIST);
        const findCategory = await this.categoryService.findOneCategoryByName(category, conts_1.NOEXIST);
        const newService = new this.serviceModel(Object.assign(Object.assign({}, serviceInput), { category: findCategory._id }));
        let serviceSaved;
        let foundService;
        try {
            serviceSaved = await newService.save();
        }
        catch (e) {
            throw new Error(`Error en ModelService.createService ${e}`);
        }
        try {
            foundService = await serviceSaved
                .populate([{ path: 'category' }])
                .execPopulate();
        }
        catch (e) {
            throw new Error(`Error en ServiceService.createService.list ${e}`);
        }
        return foundService;
    }
    async updateService(serviceInput) {
        const { id, category } = serviceInput;
        let findCategory;
        let updateService;
        const findServiceById = await this.findOneServicesById(id);
        if (category) {
            findCategory = await this.categoryService.findOneCategoryByName(category, conts_1.NOEXIST);
        }
        else {
            findCategory = await this.categoryService.findOneCategoryByName(findServiceById.category.name, conts_1.NULL);
        }
        try {
            updateService = await this.serviceModel
                .findByIdAndUpdate(id, Object.assign(Object.assign({}, serviceInput), { category: findCategory._id }), { new: true })
                .populate([
                {
                    path: 'category',
                },
            ]);
        }
        catch (e) {
            throw new Error(`Error en ServiceService.updateService ${e}`);
        }
        return updateService;
    }
    async findAllServices() {
        let findService;
        try {
            findService = await this.serviceModel.find().populate([
                {
                    path: 'category',
                },
            ]);
        }
        catch (e) {
            throw new Error(`Error en ServiceService.findAllServices ${e}`);
        }
        return findService;
    }
    async findOneServicesById(id) {
        let service;
        try {
            service = await this.serviceModel.findById(id).populate([
                {
                    path: 'category',
                },
            ]);
        }
        catch (e) {
            throw new Error(`Error en ServiceService.findOneServicesById ${e}`);
        }
        if (!service)
            throw new common_1.NotFoundException({
                path: `service`,
                message: `El servicio no se encuentra o no existe`,
            });
        return service;
    }
    async findOneServiceByName(name, param) {
        let service;
        try {
            service = await this.serviceModel.findOne({ name });
        }
        catch (e) {
            throw new Error(`Error en ServiceService.findOneServiceByName${e}`);
        }
        switch (param) {
            case conts_1.EXIST:
                if (service)
                    throw new common_1.BadRequestException({
                        path: 'service',
                        message: [`El servicio ${name} ya existe.`],
                    });
                break;
            case conts_1.NOEXIST:
                if (!service)
                    throw new common_1.BadRequestException({
                        path: 'service',
                        message: [`El servicio no existe.`],
                    });
                break;
        }
        return service;
    }
};
ServiceService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Service')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        category_service_1.CategoryService])
], ServiceService);
exports.ServiceService = ServiceService;
//# sourceMappingURL=service.service.js.map