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
exports.DeviceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const conts_1 = require("../../lib/conts");
let DeviceService = class DeviceService {
    constructor(deviceModel) {
        this.deviceModel = deviceModel;
    }
    async createDevice(deviceInput) {
        const { name } = deviceInput;
        await this.findOneDeviceByName(name, conts_1.EXIST);
        const newDevice = new this.deviceModel(Object.assign(Object.assign({}, deviceInput), { status: 1 }));
        let saveCategory;
        try {
            saveCategory = await newDevice.save();
        }
        catch (e) {
            throw new Error(`Error en DeviceService.createDevice ${e}`);
        }
        return saveCategory;
    }
    async updateDevice(deviceInput) {
        const { id } = deviceInput;
        await this.findOneDeviceById(id);
        let updateDevice;
        try {
            updateDevice = await this.deviceModel.findByIdAndUpdate(id, deviceInput, {
                new: true,
            });
        }
        catch (e) {
            throw new Error(`Error en DeviceService.updateDevice ${e}`);
        }
        return updateDevice;
    }
    async deleteDevice(id) {
        let result = false;
        await this.findOneDeviceById(id);
        try {
            await this.deviceModel.findByIdAndUpdate(id, { status: 2 });
            result = true;
        }
        catch (e) {
            throw new Error(`Error en DeviceService.deleteDevice ${e}`);
        }
        return result;
    }
    async findAllDevice() {
        let findDevice;
        try {
            findDevice = await this.deviceModel.find({ status: 1 });
        }
        catch (e) {
            throw new Error(`Error en DeviceService.findAllDevice ${e}`);
        }
        return findDevice;
    }
    async findOneDeviceById(id) {
        let device;
        try {
            device = await this.deviceModel.findById(id);
        }
        catch (e) {
            throw new Error(`Error en DeviceService.findOneDeviceById ${e}`);
        }
        if (!device)
            throw new common_1.BadRequestException({
                path: 'device',
                message: [`El dispositivo no se encuentra o no existe`],
            });
        return device;
    }
    async findOneDeviceByName(name, param) {
        let device;
        try {
            device = await this.deviceModel.findOne({ name });
        }
        catch (e) {
            throw new Error(`Error en DeviceService.findOneDeviceByName ${e}`);
        }
        switch (param) {
            case conts_1.EXIST:
                if (device)
                    throw new common_1.BadRequestException({
                        path: 'device',
                        message: [`El dispositivo ${name} ya existe.`],
                    });
                break;
            case conts_1.NOEXIST:
                if (!device)
                    throw new common_1.BadRequestException({
                        path: 'device',
                        message: [`El dispositivo no existe.`],
                    });
                break;
            case conts_1.NULL:
                return device;
        }
        return device;
    }
};
DeviceService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Device')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DeviceService);
exports.DeviceService = DeviceService;
//# sourceMappingURL=device.service.js.map