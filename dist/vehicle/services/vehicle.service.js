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
exports.VehicleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const billing_schema_1 = require("../../billing/schemas/billing.schema");
const billing_service_1 = require("../../billing/services/billing.service");
const customer_schema_1 = require("../../customer/schemas/customer.schema");
const customer_service_1 = require("../../customer/services/customer.service");
const device_schema_1 = require("../../device/schemas/device.schema");
const device_service_1 = require("../../device/services/device.service");
const conts_1 = require("../../lib/conts");
const date_fns_1 = require("date-fns");
let VehicleService = class VehicleService {
    constructor(vehicleModel, customerService, deviceService, billingService) {
        this.vehicleModel = vehicleModel;
        this.customerService = customerService;
        this.deviceService = deviceService;
        this.billingService = billingService;
    }
    async createVehicle(vehicleInput, user) {
        const { customer, device, billing, plate, nroGPS, } = vehicleInput;
        const findCustomer = await this.customerService.findOneCustomerById(customer);
        const findDevice = await this.deviceService.findOneDeviceByName(device, conts_1.NOEXIST);
        const findBilling = await this.billingService.findOneBillingByName(billing, conts_1.NOEXIST);
        await this.findOneVehicleByPlate(plate, conts_1.EXIST);
        await this.findOneVehicleByNroGPS(nroGPS, conts_1.EXIST);
        const dataStart = date_fns_1.startOfDay(new Date());
        const addDaytoEnd = date_fns_1.add(dataStart, { days: findBilling.day });
        const newVehicle = new this.vehicleModel(Object.assign(Object.assign({}, vehicleInput), { customer: findCustomer._id, device: findDevice._id, billing: findBilling._id, billigStart: dataStart, billigEnd: addDaytoEnd, createdBy: user, updatedBy: user, status: 1 }));
        let vehicleSaved;
        let foundVehicle;
        try {
            vehicleSaved = await newVehicle.save();
        }
        catch (e) {
            throw new Error(`Error en VehicleService.createVehicle ${e}`);
        }
        try {
            foundVehicle = await vehicleSaved
                .populate([
                { path: 'customer' },
                { path: 'device' },
                { path: 'billing' },
                { path: 'createdBy' },
                { path: 'updatedBy' },
            ])
                .execPopulate();
        }
        catch (e) {
            throw new Error(`Error en VehicleService.createVehicle.list ${e}`);
        }
        return foundVehicle;
    }
    async updateVehicle(vehicleInput, user) {
        const { id, customer, device, billing, billigStart, renew, billigEnd, nroGPS, plate, } = vehicleInput;
        let findCustomer;
        let findDevice;
        let findBilling;
        let updateVehicle;
        const findVehicleById = await this.findOneVehicleById(id);
        if (nroGPS !== findVehicleById.nroGPS) {
            await this.findOneVehicleByNroGPS(nroGPS, conts_1.EXIST);
        }
        if (plate !== findVehicleById.plate) {
            await this.findOneVehicleByPlate(plate, conts_1.EXIST);
        }
        if (customer) {
            findCustomer = await this.customerService.findOneCustomerById(customer);
        }
        else {
            findCustomer = await this.customerService.findOneCustomerById(findVehicleById.customer._id);
        }
        if (device) {
            findDevice = await this.deviceService.findOneDeviceByName(device, conts_1.NOEXIST);
        }
        else {
            findDevice = await this.deviceService.findOneDeviceByName(findVehicleById.device.name, conts_1.NULL);
        }
        if (billing) {
            findBilling = await this.billingService.findOneBillingByName(billing, conts_1.NOEXIST);
        }
        else {
            findBilling = await this.billingService.findOneBillingByName(findVehicleById.billing.name, conts_1.NULL);
        }
        const dataStart = date_fns_1.startOfDay(new Date(billigStart));
        const addDaytoStart = date_fns_1.add(dataStart, { days: 1 });
        const addDaytoEnd = date_fns_1.add(addDaytoStart, { days: findBilling.day });
        try {
            updateVehicle = await this.vehicleModel
                .findByIdAndUpdate(id, Object.assign(Object.assign({}, vehicleInput), { customer: findCustomer._id, device: findDevice._id, billing: findBilling._id, billigStart: renew ? billigStart : addDaytoStart, billigEnd: renew ? billigEnd : addDaytoEnd, updatedBy: user }), { new: true })
                .populate([
                {
                    path: 'customer',
                },
                {
                    path: 'device',
                },
                {
                    path: 'billing',
                },
                { path: 'createdBy' },
                { path: 'updatedBy' },
            ]);
        }
        catch (e) {
            throw new Error(`Error en VehicleService.updateVehicle ${e}`);
        }
        return updateVehicle;
    }
    async findOneVehicleById(id) {
        let vehicle;
        try {
            vehicle = await this.vehicleModel.findById(id).populate([
                {
                    path: 'customer',
                },
                {
                    path: 'device',
                },
                {
                    path: 'billing',
                },
                { path: 'createdBy' },
                { path: 'updatedBy' },
            ]);
        }
        catch (e) {
            throw new Error(`Error en VehicleService.findOneVehicleById ${e}`);
        }
        if (!vehicle)
            throw new common_1.NotFoundException({
                path: `vehicle`,
                message: [`El vehiculo no se encuentra o no existe`],
            });
        return vehicle;
    }
    async deleteVehicleById(id) {
        let result = false;
        await this.findOneVehicleById(id);
        try {
            await this.vehicleModel.findByIdAndUpdate(id, { status: 2 });
            result = true;
        }
        catch (e) {
            throw new Error(`Error en VehicleService.deleteVehicleById ${e}`);
        }
        return result;
    }
    async findAllVehicle() {
        let findVehicle;
        try {
            findVehicle = await this.vehicleModel.find({ status: 1 }).populate([
                {
                    path: 'customer',
                },
                {
                    path: 'device',
                },
                {
                    path: 'billing',
                },
                { path: 'createdBy' },
                { path: 'updatedBy' },
            ]);
        }
        catch (e) {
            throw new Error(`Error en VehicleService.findAllVehicle ${e}`);
        }
        return findVehicle;
    }
    async findOneVehicleByPlate(plate, param) {
        let vehicle;
        try {
            vehicle = await this.vehicleModel.findOne({ plate });
        }
        catch (e) {
            throw new Error(`Error en VehicleService.findOneVehicleByPlate${e}`);
        }
        switch (param) {
            case conts_1.EXIST:
                if (vehicle)
                    throw new common_1.BadRequestException({
                        path: 'vehicle',
                        message: [
                            `El vehiculo con placa ${plate} ya existe y le pertenece a otro vehículo.`,
                        ],
                    });
                break;
            case conts_1.NOEXIST:
                if (!vehicle)
                    throw new common_1.BadRequestException({
                        path: 'vehicle',
                        message: [`El vehiculo no existe.`],
                    });
                break;
        }
        return vehicle;
    }
    async findOneVehicleByNroGPS(nroGPS, param) {
        let vehicle;
        try {
            vehicle = await this.vehicleModel.findOne({ nroGPS });
        }
        catch (e) {
            throw new Error(`Error en VehicleService.findOneVehicleByPlate${e}`);
        }
        switch (param) {
            case conts_1.EXIST:
                if (vehicle)
                    throw new common_1.BadRequestException({
                        path: 'vehicle',
                        message: [
                            `El vehiculo con chip ${nroGPS} ya existe y le pertenece a otro vehículo.`,
                        ],
                    });
                break;
            case conts_1.NOEXIST:
                if (!vehicle)
                    throw new common_1.BadRequestException({
                        path: 'vehicle',
                        message: [`El vehiculo no existe.`],
                    });
                break;
        }
        return vehicle;
    }
    async buscarXrangoFechaInstalaciones(desde, hasta) {
        let vehiculos;
        console.log(desde);
        console.log(hasta);
        const desdeTest = date_fns_1.startOfDay(new Date(desde));
        const addDesde = date_fns_1.add(desdeTest, { days: 1 });
        console.log(addDesde);
        const hastaTest = date_fns_1.endOfDay(new Date(hasta));
        const addHasta = date_fns_1.add(hastaTest, { days: 1 });
        console.log(addHasta);
        try {
            vehiculos = await this.vehicleModel
                .find({
                status: 1,
                createdAt: {
                    $gte: addDesde,
                    $lt: addHasta,
                },
            })
                .populate([
                {
                    path: 'customer',
                },
                { path: 'billing' },
                { path: 'device' },
            ]);
            console.log(vehiculos);
        }
        catch (e) {
            throw new Error(`Error en VehicleService.buscarXrangoFechaInstalaciones ${e}`);
        }
        ;
        return vehiculos;
    }
    async buscarVencidosXrangoFechas(desde, hasta) {
        let vehiculos;
        console.log(desde);
        console.log(hasta);
        const desdeTest = date_fns_1.startOfDay(new Date(desde));
        const addDesde = date_fns_1.add(desdeTest, { days: 1 });
        console.log(addDesde);
        const hastaTest = date_fns_1.endOfDay(new Date(hasta));
        const addHasta = date_fns_1.add(hastaTest, { days: 1 });
        console.log(addHasta);
        try {
            vehiculos = await this.vehicleModel
                .find({
                status: 1,
                billigEnd: {
                    $gte: addDesde,
                    $lt: addHasta,
                },
            })
                .populate([
                {
                    path: 'billing',
                },
                { path: 'customer' },
                { path: 'device' },
            ]);
            console.log(vehiculos);
        }
        catch (e) {
            throw new Error(`Error en VehicleService.buscarVencidosXrangoFechas ${e}`);
        }
        ;
        return vehiculos;
    }
};
VehicleService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Vehicle')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        customer_service_1.CustomerService,
        device_service_1.DeviceService,
        billing_service_1.BillingService])
], VehicleService);
exports.VehicleService = VehicleService;
//# sourceMappingURL=vehicle.service.js.map