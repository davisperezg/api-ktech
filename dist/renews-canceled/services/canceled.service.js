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
exports.CanceledService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const renew_schema_1 = require("../../renew/schemas/renew.schema");
let CanceledService = class CanceledService {
    constructor(canceledModel, renewModel) {
        this.canceledModel = canceledModel;
        this.renewModel = renewModel;
    }
    async createCanceled(canceledInput) {
        const newCanceled = new this.canceledModel(Object.assign(Object.assign({}, canceledInput), { status: 2 }));
        let saveCanceled;
        try {
            saveCanceled = await newCanceled.save();
        }
        catch (e) {
            throw new Error(`Error en CanceledService.createCanceled ${e}`);
        }
        return saveCanceled;
    }
    async updateCanceled(canceledInput) {
        const { id } = canceledInput;
        let updateCanceled;
        const getRenew = await this.renewModel.findById(canceledInput.renew);
        const toData = {
            status: canceledInput.status,
            message: canceledInput.message,
            renew: getRenew._id,
        };
        try {
            updateCanceled = await this.canceledModel.findByIdAndUpdate(id, toData, {
                new: true,
            });
        }
        catch (e) {
            throw new Error(`Error en CanceledService.updateCanceled ${e}`);
        }
        return updateCanceled;
    }
    async findOneCanceledById(id) {
        let canceled;
        try {
            canceled = await this.canceledModel.findById(id);
        }
        catch (e) {
            throw new Error(`Error en DeviceService.findOneCanceledById ${e}`);
        }
        if (!canceled)
            throw new common_1.BadRequestException({
                path: 'canceled',
                message: [`La renoación no se encuentra o no existe`],
            });
        return canceled;
    }
};
CanceledService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Canceled')),
    __param(1, mongoose_1.InjectModel('Renew')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CanceledService);
exports.CanceledService = CanceledService;
//# sourceMappingURL=canceled.service.js.map