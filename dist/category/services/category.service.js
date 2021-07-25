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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const conts_1 = require("../../lib/conts");
let CategoryService = class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async onModuleInit() {
        try {
            await this.categoryModel.updateMany({ status: null }, { status: 1 });
        }
        catch (e) {
            throw new Error(`Error en CategoryService.onModuleInit ${e}`);
        }
    }
    async createCategory(categoryInput) {
        const { name } = categoryInput;
        await this.findOneCategoryByName(name, conts_1.EXIST);
        const newCategory = new this.categoryModel(categoryInput);
        let saveCategory;
        try {
            saveCategory = await newCategory.save();
        }
        catch (e) {
            throw new Error(`Error en CategoryService.createCategory ${e}`);
        }
        return saveCategory;
    }
    async updateCategory(categoryInput) {
        await this.findOneCategoryById(categoryInput.id);
        let updateCategory;
        try {
            updateCategory = await this.categoryModel.findByIdAndUpdate(categoryInput.id, categoryInput, { new: true });
        }
        catch (e) {
            throw new Error(`Error en CategoryService.updateCategory ${e}`);
        }
        return updateCategory;
    }
    async findAllCategory() {
        let findCategorys;
        try {
            findCategorys = await this.categoryModel.find({ status: 1 });
        }
        catch (e) {
            throw new Error(`Error en CategoryService.findAllCategory ${e}`);
        }
        return findCategorys;
    }
    async findOneCategoryByName(name, param) {
        let category;
        try {
            category = await this.categoryModel.findOne({ name });
        }
        catch (e) {
            throw new Error(`Error en CategoryService.findOneCategoryByName ${e}`);
        }
        switch (param) {
            case conts_1.EXIST:
                if (category)
                    throw new common_1.BadRequestException({
                        path: 'category',
                        message: [`La categoria ${name} ya existe.`],
                    });
                break;
            case conts_1.NOEXIST:
                if (!category)
                    throw new common_1.BadRequestException({
                        path: 'category',
                        message: [`La categoria no existe.`],
                    });
                break;
            case conts_1.NULL:
                return category;
        }
        return category;
    }
    async findOneCategoryById(id) {
        let category;
        try {
            category = await this.categoryModel.findById(id);
        }
        catch (e) {
            throw new Error(`Error en MenuService.findOneMenuById ${e}`);
        }
        if (!category)
            throw new common_1.BadRequestException({
                path: 'category',
                message: [`La categoria no se encuentra o no existe`],
            });
        return category;
    }
};
CategoryService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Category')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map