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
const canceled_service_1 = require("../../renews-canceled/services/canceled.service");
let RenewService = class RenewService {
    constructor(renewModel, userService, vehicleService, billingService, canceledService) {
        this.renewModel = renewModel;
        this.userService = userService;
        this.vehicleService = vehicleService;
        this.billingService = billingService;
        this.canceledService = canceledService;
    }
    async createRenew(renewInput, user) {
        const { vehicle, billing, billingPayToday, billingTime } = renewInput;
        let newRenew;
        let fechafinal;
        const findVehicle = await this.vehicleService.findOneVehicleByPlate(vehicle, 'NOEXIST');
        const findBilling = await this.billingService.findOneBillingById(billing);
        const isDefeated = date_fns_1.isBefore(findVehicle.billigEnd, new Date());
        const dateStart = date_fns_1.startOfDay(new Date());
        let dataToUpdatedVehicle;
        if (isDefeated) {
            if (billingPayToday !== 'SI' && billingPayToday !== 'NO') {
                throw new common_1.NotFoundException({
                    path: `renew`,
                    message: [`Por favor renueve al cliente cuando este ya aya vencido.`],
                });
            }
            if (billingPayToday === 'SI') {
                const searchPositionMonth = (month) => conts_1.allMonthsLocal.indexOf(month);
                const getDayPayed = date_fns_1.format(findVehicle.billigStart, 'dd');
                const getDayFinalPast = date_fns_1.format(findVehicle.billigEnd, 'dd');
                const getFinalPayed = billingTime[billingTime.length - 1];
                const getEndYearPayed = getFinalPayed.year;
                const getEndMonthPayed = getFinalPayed.months[getFinalPayed.months.length - 1];
                const getMonthInNumber = searchPositionMonth(getEndMonthPayed);
                const getDaysDiffStartEndPast = Number(getDayPayed) !== Number(getDayFinalPast)
                    ? getDayFinalPast
                    : getDayPayed;
                const datePayedInDate = new Date(Number(getEndYearPayed), Number(getMonthInNumber), Number(getDaysDiffStartEndPast));
                const addDaysToDatePayed = date_fns_1.add(datePayedInDate, {
                    days: findBilling.day,
                });
                newRenew = new this.renewModel(Object.assign(Object.assign({}, renewInput), { registeredBy: user, updatedBy: user, expirationDate: findVehicle.billigEnd, renovationStart: datePayedInDate, renovationEnd: addDaysToDatePayed, vehicle: findVehicle._id, billing: findBilling._id, status: 1 }));
                dataToUpdatedVehicle = {
                    renew: true,
                    id: findVehicle._id,
                    billing: billing,
                    billigStart: datePayedInDate,
                    billigEnd: addDaysToDatePayed,
                };
            }
            if (billingPayToday === 'NO') {
                const dateEndBilling = date_fns_1.add(dateStart, { days: findBilling.day });
                newRenew = new this.renewModel(Object.assign(Object.assign({}, renewInput), { registeredBy: user, updatedBy: user, expirationDate: findVehicle.billigEnd, renovationStart: dateStart, renovationEnd: dateEndBilling, vehicle: findVehicle._id, billing: findBilling._id, status: 1 }));
                dataToUpdatedVehicle = {
                    renew: true,
                    id: findVehicle._id,
                    billing: billing,
                    billigStart: dateStart,
                    billigEnd: dateEndBilling,
                };
            }
        }
        else {
            if (billingPayToday !== '') {
                throw new common_1.BadRequestException({
                    path: 'renew',
                    message: [
                        `No se permite el ingreso de "dia de pago". No hemos podido renovar el vehiculo.`,
                    ],
                });
            }
            fechafinal = date_fns_1.add(findVehicle.billigEnd, { days: findBilling.day });
            newRenew = new this.renewModel(Object.assign(Object.assign({}, renewInput), { registeredBy: user, updatedBy: user, expirationDate: findVehicle.billigEnd, renovationStart: findVehicle.billigStart, renovationEnd: fechafinal, vehicle: findVehicle._id, billing: findBilling._id, status: 1 }));
            dataToUpdatedVehicle = {
                renew: true,
                id: findVehicle._id,
                billing: billing,
                billigStart: findVehicle.billigStart,
                billigEnd: fechafinal,
            };
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
            await this.vehicleService.updateVehicle(dataToUpdatedVehicle, user);
        }
        catch (e) {
            throw new Error(`Error en RenewService.createRenew ${e}`);
        }
        return vehicleSaved;
    }
    async toCheck(renewInput) {
        const { id } = renewInput;
        let updateRenew;
        try {
            updateRenew = await this.renewModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, renewInput), { status: 2 }), {
                new: true,
            });
            await this.canceledService.createCanceled({
                renew: updateRenew._id,
            });
        }
        catch (e) {
            throw new Error(`Error en RenewService.toCheck ${e}`);
        }
        return updateRenew;
    }
    async findAllRenews() {
        let findRenew;
        try {
            findRenew = await this.renewModel
                .find({ status: 1 })
                .populate([
                { path: 'vehicle', populate: [{ path: 'customer' }] },
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
    async findAllRenewsById(id) {
        let findRenew;
        try {
            findRenew = await this.renewModel
                .findById(id, { status: 1 })
                .populate([
                { path: 'vehicle', populate: [{ path: 'customer' }] },
                { path: 'billing' },
                { path: 'registeredBy' },
                { path: 'updatedBy' },
            ]);
        }
        catch (e) {
            throw new Error(`Error en RenewService.findAllRenewsById ${e}`);
        }
        return findRenew;
    }
    async findAllRenewsByVehicle(id) {
        let findRenew;
        const getVehicleWithPlate = await this.vehicleService.findOneVehicleByPlate(id, 'NOEXITS');
        try {
            findRenew = await this.renewModel
                .find({
                vehicle: getVehicleWithPlate._id,
            })
                .populate([
                { path: 'vehicle', populate: [{ path: 'customer' }] },
                { path: 'billing' },
                { path: 'registeredBy' },
                { path: 'updatedBy' },
            ]);
        }
        catch (e) {
            throw new Error(`Error en RenewService.findAllRenewsByVehicle ${e}`);
        }
        return findRenew;
    }
    async buscarRenovacionesXFecha(desde, hasta) {
        let vehiculos;
        const desdeTest = date_fns_1.startOfDay(new Date(desde));
        const addDesde = date_fns_1.add(desdeTest, { days: 1 });
        const hastaTest = date_fns_1.endOfDay(new Date(hasta));
        const addHasta = date_fns_1.add(hastaTest, { days: 1 });
        try {
            vehiculos = await this.renewModel
                .find({
                status: 1,
                createdAt: {
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
        billing_service_1.BillingService,
        canceled_service_1.CanceledService])
], RenewService);
exports.RenewService = RenewService;
//# sourceMappingURL=renew.service.js.map