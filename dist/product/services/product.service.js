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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const brand_schema_1 = require("../../brand/schemas/brand.schema");
const brand_service_1 = require("../../brand/services/brand.service");
const category_schema_1 = require("../../category/schemas/category.schema");
const category_service_1 = require("../../category/services/category.service");
const conts_1 = require("../../lib/conts");
const model_schema_1 = require("../../model/schemas/model.schema");
const model_service_1 = require("../../model/services/model.service");
let ProductService = class ProductService {
    constructor(productModel, categoryService, brandService, modelService) {
        this.productModel = productModel;
        this.categoryService = categoryService;
        this.brandService = brandService;
        this.modelService = modelService;
    }
    async createProduct(productInput) {
        const { name, category, brand, model } = productInput;
        await this.findOneProductByName(name, conts_1.EXIST);
        const findCategory = await this.categoryService.findOneCategoryByName(category, conts_1.NOEXIST);
        const findBrand = await this.brandService.findOneBrandByName(brand, conts_1.NOEXIST);
        const findModel = await this.modelService.findOneModelByName(model, conts_1.NOEXIST);
        const newProduct = new this.productModel(Object.assign(Object.assign({}, productInput), { category: findCategory._id, brand: findBrand._id, model: findModel._id }));
        let productSaved;
        let foundProduct;
        try {
            productSaved = await newProduct.save();
        }
        catch (e) {
            throw new Error(`Error en ProductService.createProduct ${e}`);
        }
        try {
            foundProduct = await productSaved
                .populate([{ path: 'category' }, { path: 'brand' }, { path: 'model' }])
                .execPopulate();
        }
        catch (e) {
            throw new Error(`Error en ProductService.createProduct.list ${e}`);
        }
        return foundProduct;
    }
    async updateProduct(productInput) {
        const { id, category, brand, model, price } = productInput;
        let findCategory;
        let findBrand;
        let findModel;
        let updateProduct;
        const findProductById = await this.findOneProductById(id);
        if (category) {
            findCategory = await this.categoryService.findOneCategoryByName(category, conts_1.NOEXIST);
        }
        else {
            findCategory = await this.categoryService.findOneCategoryByName(findProductById.category.name, conts_1.NULL);
        }
        if (brand) {
            findBrand = await this.brandService.findOneBrandByName(brand, conts_1.NOEXIST);
        }
        else {
            findBrand = await this.brandService.findOneBrandByName(findProductById.brand.name, conts_1.NULL);
        }
        if (model) {
            findModel = await this.modelService.findOneModelByName(model, conts_1.NOEXIST);
        }
        else {
            findModel = await this.modelService.findOneModelByName(findProductById.model.name, conts_1.NULL);
        }
        try {
            updateProduct = await this.productModel
                .findByIdAndUpdate(id, Object.assign(Object.assign({}, productInput), { price: Number(price), category: findCategory._id, brand: findBrand._id, model: findModel._id }), { new: true })
                .populate([
                {
                    path: 'category',
                },
                {
                    path: 'brand',
                },
                {
                    path: 'model',
                },
            ]);
        }
        catch (e) {
            throw new Error(`Error en ProductService.updateProduct ${e}`);
        }
        return updateProduct;
    }
    async findAllProducts() {
        let findProduct;
        try {
            findProduct = await this.productModel.find().populate([
                {
                    path: 'category',
                },
                {
                    path: 'brand',
                },
                {
                    path: 'model',
                },
            ]);
        }
        catch (e) {
            throw new Error(`Error en ProductService.findAllProducts ${e}`);
        }
        return findProduct;
    }
    async findOneProductById(id) {
        let product;
        try {
            product = await this.productModel.findById(id).populate([
                {
                    path: 'category',
                },
                {
                    path: 'brand',
                },
                {
                    path: 'model',
                },
            ]);
        }
        catch (e) {
            throw new Error(`Error en ProductService.findOneProductById ${e}`);
        }
        if (!product)
            throw new common_1.NotFoundException({
                path: `product`,
                message: `El producto no se encuentra o no existe`,
            });
        return product;
    }
    async findOneProductByName(name, param) {
        let product;
        try {
            product = await this.productModel.findOne({ name });
        }
        catch (e) {
            throw new Error(`Error en ServiceService.findOneServiceByName${e}`);
        }
        switch (param) {
            case conts_1.EXIST:
                if (product)
                    throw new common_1.BadRequestException({
                        path: 'product',
                        message: [`El producto ${name} ya existe.`],
                    });
                break;
            case conts_1.NOEXIST:
                if (!product)
                    throw new common_1.BadRequestException({
                        path: 'product',
                        message: [`El producto no existe.`],
                    });
                break;
        }
        return product;
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        category_service_1.CategoryService,
        brand_service_1.BrandService,
        model_service_1.ModelService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map