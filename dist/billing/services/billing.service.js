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
exports.BillingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const conts_1 = require("../../lib/conts");
let BillingService = class BillingService {
    constructor(billingModel) {
        this.billingModel = billingModel;
    }
    async createBilling(billingInput) {
        const { name } = billingInput;
        await this.findOneBillingByName(name, conts_1.EXIST);
        const newBilling = new this.billingModel(Object.assign(Object.assign({}, billingInput), { status: 1 }));
        let saveBilling;
        try {
            saveBilling = await newBilling.save();
        }
        catch (e) {
            throw new Error(`Error en BillingService.createBilling ${e}`);
        }
        return saveBilling;
    }
    async updateBilling(billingInput) {
        const { id } = billingInput;
        await this.findOneBillingById(id);
        let updateBilling;
        try {
            updateBilling = await this.billingModel.findByIdAndUpdate(id, billingInput, { new: true });
        }
        catch (e) {
            throw new Error(`Error en BillingService.updateBilling ${e}`);
        }
        return updateBilling;
    }
    async deleteBilling(id) {
        let result = false;
        await this.findOneBillingById(id);
        try {
            await this.billingModel.findByIdAndUpdate(id, { status: 2 });
            result = true;
        }
        catch (e) {
            throw new Error(`Error en BillingService.deleteBilling ${e}`);
        }
        return result;
    }
    async findAllBilling() {
        let findBilling;
        try {
            findBilling = await this.billingModel.find({ status: 1 });
        }
        catch (e) {
            throw new Error(`Error en BillingService.findAllBilling ${e}`);
        }
        return findBilling;
    }
    async findOneBillingById(id) {
        let billing;
        try {
            billing = await this.billingModel.findById(id);
        }
        catch (e) {
            throw new Error(`Error en BillingService.findOneBillingById ${e}`);
        }
        if (!billing)
            throw new common_1.BadRequestException({
                path: 'billing',
                message: [`El plan de facturación no se encuentra o no existe`],
            });
        return billing;
    }
    async findOneBillingByName(name, param) {
        let billing;
        try {
            billing = await this.billingModel.findOne({ name });
        }
        catch (e) {
            throw new Error(`Error en BillingService.findOneBillingByName ${e}`);
        }
        switch (param) {
            case conts_1.EXIST:
                if (billing)
                    throw new common_1.BadRequestException({
                        path: 'billing',
                        message: [`El plan de facturación ${name} ya existe.`],
                    });
                break;
            case conts_1.NOEXIST:
                if (!billing)
                    throw new common_1.BadRequestException({
                        path: 'billing',
                        message: [`La plan de facturación no existe.`],
                    });
                break;
            case conts_1.NULL:
                return billing;
        }
        return billing;
    }
};
BillingService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Billing')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BillingService);
exports.BillingService = BillingService;
//# sourceMappingURL=billing.service.js.map