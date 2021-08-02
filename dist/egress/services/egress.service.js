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
exports.EgressService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_service_1 = require("../../category/services/category.service");
const conts_1 = require("../../lib/conts");
const category_schema_1 = require("../../category/schemas/category.schema");
const date_fns_1 = require("date-fns");
const user_schema_1 = require("../../user/schemas/user.schema");
const user_service_1 = require("../../user/services/user.service");
let EgressService = class EgressService {
    constructor(egressModel, categoryService, userService) {
        this.egressModel = egressModel;
        this.categoryService = categoryService;
        this.userService = userService;
    }
    async onModuleInit() {
        try {
            await this.egressModel.updateMany({ status: null }, { status: 1 });
        }
        catch (e) {
            throw new Error(`Error en EgressService.onModuleInit ${e}`);
        }
    }
    async createEgress(egressInput) {
        const { category, user } = egressInput;
        const findCategory = await this.categoryService.findOneCategoryByName(category, conts_1.NOEXIST);
        const findUser = await this.userService.findOneUserByName(user, conts_1.NOEXIST);
        const newEgress = new this.egressModel(Object.assign(Object.assign({}, egressInput), { category: findCategory._id, user: findUser._id, status: 1 }));
        let egressSaved;
        let foundEgress;
        try {
            egressSaved = await newEgress.save();
        }
        catch (e) {
            throw new Error(`Error en EgressService.createEgress ${e}`);
        }
        try {
            foundEgress = await egressSaved
                .populate([{ path: 'category' }, { path: 'user' }])
                .execPopulate();
        }
        catch (e) {
            throw new Error(`Error en EgressService.createEgress.list ${e}`);
        }
        return foundEgress;
    }
    async updateEgress(egressInput) {
        const { id, category, user } = egressInput;
        let findCategory;
        let findUser;
        let updateEgress;
        const findEgressById = await this.findOneEgressById(id);
        if (category) {
            findCategory = await this.categoryService.findOneCategoryByName(category, conts_1.NOEXIST);
        }
        else {
            findCategory = await this.categoryService.findOneCategoryByName(findEgressById.category.name, conts_1.NULL);
        }
        if (user) {
            findUser = await this.userService.findOneUserByName(user, conts_1.NOEXIST);
        }
        else {
            findUser = await this.userService.findOneUserByName(findEgressById.category.name, conts_1.NULL);
        }
        try {
            updateEgress = await this.egressModel
                .findByIdAndUpdate(id, Object.assign(Object.assign({}, egressInput), { category: findCategory._id, user: findUser._id }), { new: true })
                .populate([
                {
                    path: 'category',
                },
                { path: 'user' },
            ]);
        }
        catch (e) {
            throw new Error(`Error en EgressService.updateEgress ${e}`);
        }
        return updateEgress;
    }
    async deleteEgressById(id) {
        let result = false;
        await this.findOneEgressById(id);
        try {
            await this.egressModel.findByIdAndUpdate(id, { status: 2 });
            result = true;
        }
        catch (e) {
            throw new Error(`Error en EgressService.deleteEgressById ${e}`);
        }
        return result;
    }
    async findAllEgressToDay() {
        let findEgress;
        const todayStart = date_fns_1.startOfDay(new Date());
        const todayEnd = date_fns_1.endOfDay(new Date());
        try {
            findEgress = await this.egressModel
                .find({
                status: 1,
                createdAt: { $gte: todayStart, $lte: todayEnd },
            })
                .populate([
                {
                    path: 'category',
                },
                { path: 'user' },
            ]);
        }
        catch (e) {
            throw new Error(`Error en EgressService.findAllEgress ${e}`);
        }
        return findEgress;
    }
    async findEgressByDates(start, end) {
        let findEgress;
        const todayStart = date_fns_1.startOfDay(new Date(start));
        const addDaytoStart = date_fns_1.add(todayStart, { days: 1 });
        const todayEnd = date_fns_1.endOfDay(new Date(end));
        const addDaytoEnd = date_fns_1.add(todayEnd, { days: 1 });
        console.log(`Egreso`, addDaytoStart, addDaytoEnd);
        try {
            findEgress = await this.egressModel
                .find({
                status: 1,
                createdAt: {
                    $gte: addDaytoStart,
                    $lt: addDaytoEnd,
                },
            })
                .populate([
                {
                    path: 'category',
                },
                { path: 'user' },
            ]);
        }
        catch (e) {
            throw new Error(`Error en EgressService.findEgressByDates ${e}`);
        }
        return findEgress;
    }
    async findAllEgress() {
        let findEgress;
        try {
            findEgress = await this.egressModel.find({ status: 1 }).populate([
                {
                    path: 'category',
                },
                { path: 'user' },
            ]);
        }
        catch (e) {
            throw new Error(`Error en EgressService.findAllEgress ${e}`);
        }
        return findEgress;
    }
    async findOneEgressById(id) {
        let egress;
        try {
            egress = await this.egressModel.findById(id).populate([
                {
                    path: 'category',
                },
                { path: 'user' },
            ]);
        }
        catch (e) {
            throw new Error(`Error en EgressService.findOneEgressById ${e}`);
        }
        if (!egress)
            throw new common_1.NotFoundException({
                path: `egress`,
                message: `El egreso no se encuentra o no existe`,
            });
        return egress;
    }
};
EgressService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Egress')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        category_service_1.CategoryService,
        user_service_1.UserService])
], EgressService);
exports.EgressService = EgressService;
//# sourceMappingURL=egress.service.js.map