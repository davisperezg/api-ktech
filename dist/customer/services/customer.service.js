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
        const { numDocument, cellphone_1, cellphone_2 } = customerInput;
        await this.findOneCustomerByNroDocument(numDocument, conts_1.EXIST);
        await this.findOneCustomerByCellphoneOne(cellphone_1, conts_1.EXIST);
        await this.findOneCustomerByCellphoneTwo(cellphone_1, conts_1.EXIST);
        if (cellphone_2) {
            await this.findOneCustomerByCellphoneTwo(cellphone_2, conts_1.EXIST);
            await this.findOneCustomerByCellphoneOne(cellphone_2, conts_1.EXIST);
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
        const { id, numDocument, cellphone_1, cellphone_2, direction, } = customerInput;
        let updateCustomer;
        const findCustomerById = await this.findOneCustomerById(id);
        if (numDocument !== findCustomerById.numDocument) {
            await this.findOneCustomerByNroDocument(numDocument, conts_1.EXIST);
        }
        if (cellphone_1 !== findCustomerById.cellphone_1) {
            await this.findOneCustomerByCellphoneOne(cellphone_1, conts_1.EXIST);
        }
        if (cellphone_1 !== findCustomerById.cellphone_2) {
            await this.findOneCustomerByCellphoneTwo(cellphone_1, conts_1.EXIST);
        }
        if (!cellphone_2) {
            customerInput.cellphone_2 = '';
        }
        else {
            if (cellphone_2 !== findCustomerById.cellphone_2) {
                await this.findOneCustomerByCellphoneTwo(cellphone_2, conts_1.EXIST);
            }
            if (cellphone_2 !== findCustomerById.cellphone_1) {
                await this.findOneCustomerByCellphoneOne(cellphone_2, conts_1.EXIST);
            }
        }
        if (!direction) {
            customerInput.direction = '';
        }
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
    async findOneCustomerByNroDocument(number, param) {
        let customer;
        try {
            customer = await this.customerModel.findOne({ numDocument: number });
        }
        catch (e) {
            throw new Error(`Error en CustomerService.findOneCustomerByNroDocument ${e}`);
        }
        switch (param) {
            case conts_1.EXIST:
                if (customer)
                    throw new common_1.BadRequestException({
                        path: 'customer',
                        message: [
                            `El cliente con nro de documento ${number} ya existe y le pertenece a otro cliente.`,
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
        }
        return customer;
    }
    async findOneCustomerByCellphoneOne(number, param) {
        let customer;
        try {
            customer = await this.customerModel.findOne({ cellphone_1: number });
        }
        catch (e) {
            throw new Error(`Error en CustomerService.findOneCustomerByCellphoneOne ${e}`);
        }
        switch (param) {
            case conts_1.EXIST:
                if (customer)
                    throw new common_1.BadRequestException({
                        path: 'customer',
                        message: [
                            `El cliente con nro de celular ${number} ya existe y le pertenece a otro cliente.`,
                        ],
                    });
                break;
            case conts_1.NOEXIST:
                if (!customer)
                    throw new common_1.BadRequestException({
                        path: 'customer',
                        message: [`El nro de celular principal del cliente no existe.`],
                    });
                break;
        }
        return customer;
    }
    async findOneCustomerByCellphoneTwo(number, param) {
        let customer;
        try {
            customer = await this.customerModel.findOne({ cellphone_2: number });
        }
        catch (e) {
            throw new Error(`Error en CustomerService.findOneCustomerByCellphoneTwo ${e}`);
        }
        switch (param) {
            case conts_1.EXIST:
                if (customer)
                    throw new common_1.BadRequestException({
                        path: 'customer',
                        message: [
                            `El cliente con nro de celular ${number} ya existe y le pertenece a otro cliente.`,
                        ],
                    });
                break;
            case conts_1.NOEXIST:
                if (!customer)
                    throw new common_1.BadRequestException({
                        path: 'customer',
                        message: [`El nro de celular opcional del cliente no existe.`],
                    });
                break;
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