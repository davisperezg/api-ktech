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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const conts_1 = require("../../lib/conts");
let CustomerService = class CustomerService {
    constructor(customerModel) {
        this.customerModel = customerModel;
    }
    async createCustomer(customerInput) {
        const { numDocument } = customerInput;
        const findUserByNroDocument = await this.findOneCustomerByNroDocument(numDocument);
        if (findUserByNroDocument) {
            throw new common_1.BadRequestException({
                path: `customer`,
                message: [`El cliente ya se encuentra registrado.`],
            });
        }
        let customerSaved;
        const newCustomer = new this.customerModel(Object.assign(Object.assign({}, customerInput), { status: 1 }));
        try {
            customerSaved = await newCustomer.save();
        }
        catch (e) {
            throw new Error(`Error en CustomerService.createCustomer ${e}`);
        }
        return customerSaved;
    }
    async updateCustomer(customerInput) {
        const { id } = customerInput;
        let updateCustomer;
        try {
            updateCustomer = await this.customerModel.findByIdAndUpdate(id, customerInput, { new: true });
        }
        catch (e) {
            throw new Error(`Error en CustomerService.updateCustomer ${e}`);
        }
        return updateCustomer;
    }
    async deleteCustomer(id) {
        let result = false;
        await this.findOneCustomerById(id);
        try {
            await this.customerModel.findByIdAndUpdate(id, { status: 2 });
            result = true;
        }
        catch (e) {
            throw new Error(`Error en CustomerService.deleteCustomer ${e}`);
        }
        return result;
    }
    async findAllCustomer() {
        let findCustomer;
        try {
            findCustomer = await this.customerModel.find({ status: 1 });
        }
        catch (e) {
            throw new Error(`Error en CustomerService.findAllCustomer ${e}`);
        }
        return findCustomer;
    }
    async findOneCustomerById(id) {
        let customer;
        try {
            customer = await this.customerModel.findById(id);
        }
        catch (e) {
            throw new Error(`Error en CustomerService.findOneCustomerById ${e}`);
        }
        if (!customer)
            throw new common_1.NotFoundException({
                path: `customer`,
                message: [`El cliente no se encuentra o no existe`],
            });
        return customer;
    }
    async findOneCustomerByNroDocument(number) {
        let customer;
        try {
            customer = await this.customerModel.findOne({ numDocument: number });
        }
        catch (e) {
            throw new Error(`Error en CustomerService.findOneProductByName ${e}`);
        }
        return customer;
    }
    async findOneCustomerByLastname(lastName, param) {
        let customer;
        console.log(lastName);
        console.log(param);
        try {
            customer = await this.customerModel.findOne({ lastName });
            console.log(customer);
        }
        catch (e) {
            throw new Error(`Error en CustomerService.findOneCustomerByName ${e}`);
        }
        switch (param) {
            case conts_1.EXIST:
                if (customer)
                    throw new common_1.BadRequestException({
                        path: 'customer',
                        message: [
                            `El cliente ${customer.name} ${customer.lastName} ya existe.`,
                        ],
                    });
                break;
            case conts_1.NOEXIST:
                if (!customer)
                    throw new common_1.BadRequestException({
                        path: 'customer',
                        message: [`El cliente no existe.`],
                    });
                break;
            case conts_1.NULL:
                return customer;
        }
        return customer;
    }
};
CustomerService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Customer')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map