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
exports.IngressService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_service_1 = require("../../category/services/category.service");
const conts_1 = require("../../lib/conts");
const category_schema_1 = require("../../category/schemas/category.schema");
const moment = require("moment");
let IngressService = class IngressService {
    constructor(ingressModel, categoryService) {
        this.ingressModel = ingressModel;
        this.categoryService = categoryService;
    }
    async onModuleInit() {
        try {
            await this.ingressModel.updateMany({ status: null }, { status: 1 });
        }
        catch (e) {
            throw new Error(`Error en IngressService.onModuleInit ${e}`);
        }
    }
    async createIngress(ingressInput) {
        const { category } = ingressInput;
        const findCategory = await this.categoryService.findOneCategoryByName(category, conts_1.NOEXIST);
        const newIngress = new this.ingressModel(Object.assign(Object.assign({}, ingressInput), { category: findCategory._id, status: 1 }));
        let ingressSaved;
        let foundIngress;
        try {
            ingressSaved = await newIngress.save();
        }
        catch (e) {
            throw new Error(`Error en IngressService.createIngress ${e}`);
        }
        try {
            foundIngress = await ingressSaved
                .populate([{ path: 'category' }])
                .execPopulate();
        }
        catch (e) {
            throw new Error(`Error en IngressService.createIngress.list ${e}`);
        }
        return foundIngress;
    }
    async updateIngress(ingressInput) {
        const { id, category } = ingressInput;
        let findCategory;
        let updateIngress;
        const findIngressById = await this.findOneIngressById(id);
        if (category) {
            findCategory = await this.categoryService.findOneCategoryByName(category, conts_1.NOEXIST);
        }
        else {
            findCategory = await this.categoryService.findOneCategoryByName(findIngressById.category.name, conts_1.NULL);
        }
        try {
            updateIngress = await this.ingressModel
                .findByIdAndUpdate(id, Object.assign(Object.assign({}, ingressInput), { category: findCategory._id }), { new: true })
                .populate([
                {
                    path: 'category',
                },
            ]);
        }
        catch (e) {
            throw new Error(`Error en IngressService.updateIngress ${e}`);
        }
        return updateIngress;
    }
    async deleteIngressById(id) {
        let result = false;
        await this.findOneIngressById(id);
        try {
            await this.ingressModel.findByIdAndUpdate(id, { status: 2 });
            result = true;
        }
        catch (e) {
            throw new Error(`Error en IngressService.deleteIngressById ${e}`);
        }
        return result;
    }
    async findAllIngressToDay() {
        let findIngress;
        const now = moment.utc().format();
        try {
            findIngress = await this.ingressModel.find({ status: 1 }).populate([
                {
                    path: 'category',
                },
            ]);
            findIngress = findIngress
                .map((res) => {
                return {
                    id: res._id,
                    detail: res.detail,
                    observation: res.observation,
                    units: res.units,
                    amount: res.amount,
                    createdAt: moment.utc(res.createdAt).local().format('DD/MM/YYYY'),
                    updatedAt: moment.utc(res.updatedAt).local().format('DD/MM/YYYY'),
                    category: {
                        name: res.category.name,
                    },
                };
            })
                .filter((fil) => fil.createdAt === moment.utc(now).local().format('DD/MM/YYYY'));
        }
        catch (e) {
            throw new Error(`Error en IngressService.findAllIngress ${e}`);
        }
        return findIngress;
    }
    async findOneIngressById(id) {
        let ingress;
        try {
            ingress = await this.ingressModel.findById(id).populate([
                {
                    path: 'category',
                },
            ]);
        }
        catch (e) {
            throw new Error(`Error en IngressService.findOneIngressById ${e}`);
        }
        if (!ingress)
            throw new common_1.NotFoundException({
                path: `ingress`,
                message: `El ingreso no se encuentra o no existe`,
            });
        return ingress;
    }
};
IngressService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Ingress')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        category_service_1.CategoryService])
], IngressService);
exports.IngressService = IngressService;
//# sourceMappingURL=ingress.service.js.map