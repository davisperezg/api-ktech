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
exports.BrandService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_service_1 = require("../../category/services/category.service");
const category_schema_1 = require("../../category/schemas/category.schema");
const conts_1 = require("../../lib/conts");
let BrandService = class BrandService {
    constructor(brandModel, categoryService) {
        this.brandModel = brandModel;
        this.categoryService = categoryService;
    }
    async createBrand(brandInput) {
        const { name, category } = brandInput;
        await this.findOneBrandByName(name, conts_1.EXIST);
        const findCategory = await this.categoryService.findOneCategoryByName(category, conts_1.NOEXIST);
        const newBrand = new this.brandModel(Object.assign(Object.assign({}, brandInput), { category: findCategory._id }));
        let brandSaved;
        let foundBrand;
        try {
            brandSaved = await newBrand.save();
        }
        catch (e) {
            throw new Error(`Error en BrandService.createBrand ${e}`);
        }
        try {
            foundBrand = await brandSaved
                .populate([{ path: 'category' }])
                .execPopulate();
        }
        catch (e) {
            throw new Error(`Error en BrandService.createBrand.list ${e}`);
        }
        return foundBrand;
    }
    async updateBrand(brandInput) {
        const { id, category } = brandInput;
        let findCategory;
        let updateBrand;
        const findBrandById = await this.findOneBrandById(id);
        if (category) {
            findCategory = await this.categoryService.findOneCategoryByName(category, conts_1.NOEXIST);
        }
        else {
            findCategory = await this.categoryService.findOneCategoryByName(findBrandById.category.name, conts_1.NULL);
        }
        try {
            updateBrand = await this.brandModel
                .findByIdAndUpdate(id, Object.assign(Object.assign({}, brandInput), { category: findCategory._id }), { new: true })
                .populate([
                {
                    path: 'category',
                },
            ]);
        }
        catch (e) {
            throw new Error(`Error en BrandService.updateBrand ${e}`);
        }
        return updateBrand;
    }
    async findAllBrands() {
        let findBrand;
        try {
            findBrand = await this.brandModel.find().populate([
                {
                    path: 'category',
                },
            ]);
        }
        catch (e) {
            throw new Error(`Error en BrandService.findAllBrands ${e}`);
        }
        return findBrand;
    }
    async findBrandsByCategory(category) {
        let brands;
        try {
            brands = await this.brandModel.find().populate({
                path: 'category',
                match: {
                    name: category,
                },
            });
            brands = brands.filter((brand) => brand.category !== null);
        }
        catch (e) {
            throw new Error(`Error en BrandService.findBrandsByCategory ${e}`);
        }
        return brands;
    }
    async findOneBrandById(id) {
        let brand;
        try {
            brand = await this.brandModel.findById(id).populate([
                {
                    path: 'category',
                },
            ]);
        }
        catch (e) {
            throw new Error(`Error en BrandService.findOneBrandById ${e}`);
        }
        if (!brand)
            throw new common_1.NotFoundException(`La marca no se encuentra o no existe`);
        return brand;
    }
    async findOneBrandByName(name, param) {
        let brand;
        try {
            brand = await this.brandModel.findOne({ name });
        }
        catch (e) {
            throw new common_1.BadRequestException({
                path: 'brand',
                message: [`La marca ${name} ya existe.`],
            });
        }
        switch (param) {
            case conts_1.EXIST:
                if (brand)
                    throw new common_1.BadRequestException({
                        path: 'brand',
                        message: [`La marca ${name} ya existe.`],
                    });
                break;
            case conts_1.NOEXIST:
                if (!brand)
                    throw new common_1.BadRequestException({
                        path: 'brand',
                        message: [`La marca no existe.`],
                    });
            case conts_1.NULL:
                return brand;
        }
        return brand;
    }
};
BrandService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Brand')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        category_service_1.CategoryService])
], BrandService);
exports.BrandService = BrandService;
//# sourceMappingURL=brand.service.js.map