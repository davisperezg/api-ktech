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
exports.RenewService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const billing_service_1 = require("../../billing/services/billing.service");
const conts_1 = require("../../lib/conts");
const user_service_1 = require("../../user/services/user.service");
const vehicle_service_1 = require("../../vehicle/services/vehicle.service");
const date_fns_1 = require("date-fns");
const update_vehicle_input_1 = require("../../vehicle/dto/inputs/update-vehicle.input");
let RenewService = class RenewService {
    constructor(renewModel, userService, vehicleService, billingService) {
        this.renewModel = renewModel;
        this.userService = userService;
        this.vehicleService = vehicleService;
        this.billingService = billingService;
    }
    async createRenew(renewInput, user) {
        const { vehicle, billing } = renewInput;
        let newRenew;
        let fechafinal;
        const findVehicle = await this.vehicleService.findOneVehicleByPlate(vehicle, conts_1.NOEXIST);
        const findBilling = await this.billingService.findOneBillingByName(billing, conts_1.NOEXIST);
        const getTimeEnd = findVehicle.billigEnd.getTime();
        const dataStart = date_fns_1.startOfDay(new Date());
        const getTimeStart = dataStart.getTime();
        if (getTimeStart > getTimeEnd) {
            fechafinal = date_fns_1.add(dataStart, { days: findBilling.day });
            newRenew = new this.renewModel(Object.assign(Object.assign({}, renewInput), { registeredBy: user, updatedBy: user, expirationDate: findVehicle.billigEnd, renovationStart: dataStart, renovationEnd: fechafinal, vehicle: findVehicle._id, billing: findBilling._id, status: 1 }));
        }
        else {
            fechafinal = date_fns_1.add(findVehicle.billigEnd, { days: findBilling.day });
            newRenew = new this.renewModel(Object.assign(Object.assign({}, renewInput), { registeredBy: user, updatedBy: user, expirationDate: findVehicle.billigEnd, renovationStart: dataStart, renovationEnd: fechafinal, vehicle: findVehicle._id, billing: findBilling._id, status: 1 }));
        }
        let vehicleSaved;
        try {
            vehicleSaved = await (await newRenew.save())
                .populate([
                { path: 'vehicle' },
                { path: 'billing' },
                { path: 'registeredBy' },
                { path: 'updatedBy' },
            ])
                .execPopulate();
            const dataToUpdatedVehicle = {
                renew: true,
                id: findVehicle._id,
                billing: billing,
                billigStart: dataStart,
                billigEnd: fechafinal,
            };
            await this.vehicleService.updateVehicle(dataToUpdatedVehicle, user);
        }
        catch (e) {
            throw new Error(`Error en RenewService.createRenew ${e}`);
        }
        return vehicleSaved;
    }
    async findAllRenews() {
        let findRenew;
        try {
            findRenew = await this.renewModel
                .find({ status: 1 })
                .populate([
                { path: 'vehicle' },
                { path: 'billing' },
                { path: 'registeredBy' },
                { path: 'updatedBy' },
            ]);
        }
        catch (e) {
            throw new Error(`Error en RenewService.findAllRenews ${e}`);
        }
        return findRenew;
    }
    async buscarRenovacionesXFecha(desde, hasta) {
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
            vehiculos = await this.renewModel
                .find({
                status: 1,
                renovationStart: {
                    $gte: addDesde,
                    $lt: addHasta,
                },
            })
                .populate([
                {
                    path: 'vehicle',
                    populate: [{ path: 'customer' }, { path: 'device' }],
                },
                { path: 'billing' },
            ]);
            console.log(vehiculos);
        }
        catch (e) {
            throw new Error(`Error en RenewService.buscarRenovacionesXFecha ${e}`);
        }
        return vehiculos;
    }
};
RenewService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Renew')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        vehicle_service_1.VehicleService,
        billing_service_1.BillingService])
], RenewService);
exports.RenewService = RenewService;
//# sourceMappingURL=renew.service.js.map